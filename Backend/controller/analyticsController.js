const Visitor = require('../models/Visitors');
const geoip = require('geoip-lite');
const useragent = require('useragent');

// @desc    Track visitor
// @route   POST /api/analytics/visitor
// @access  Public
exports.trackVisitor = async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const agent = useragent.parse(userAgent);
    
    const geo = geoip.lookup(ip);
    
    const visitor = await Visitor.create({
      ipAddress: ip,
      userAgent: userAgent,
      referrer: req.headers.referer || 'direct',
      path: req.body.path || '/',
      country: geo ? geo.country : 'Unknown',
      deviceType: agent.device.toString().toLowerCase().includes('mobile') ? 'mobile' : 
                 agent.device.toString().toLowerCase().includes('tablet') ? 'tablet' : 'desktop'
    });

    res.status(200).json({
      success: true,
      data: visitor
    });
  } catch (err) {
    // Fail silently for analytics
    res.status(200).json({
      success: false
    });
  }
};

// @desc    Get visitor analytics (protected)
// @route   GET /api/analytics/visitors
// @access  Private
exports.getVisitorStats = async (req, res, next) => {
  try {
    // Get total visitors
    const totalVisitors = await Visitor.countDocuments();
    
    // Get visitors by country
    const visitorsByCountry = await Visitor.aggregate([
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Get visitors by device
    const visitorsByDevice = await Visitor.aggregate([
      { $group: { _id: '$deviceType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get visitors by time (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const visitorsByDay = await Visitor.aggregate([
      { $match: { visitedAt: { $gte: sevenDaysAgo } } },
      { $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$visitedAt" } },
          count: { $sum: 1 }
        } 
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalVisitors,
        visitorsByCountry,
        visitorsByDevice,
        visitorsByDay
      }
    });
  } catch (err) {
    next(err);
  }
};