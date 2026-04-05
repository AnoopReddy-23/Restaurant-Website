import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSalesStats, setTimeframe } from '../../Slices/salesSlice';
import { Container, Row, Col, Card, ButtonGroup, Button, Badge } from 'react-bootstrap';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, Cell, PieChart, Pie
} from 'recharts';
import { FaDollarSign, FaUtensils, FaChartPie, FaCalendarAlt } from 'react-icons/fa';
import './SalesAnalytics.css';

const COLORS = ['#d4af37', '#b8860b', '#daa520', '#ffd700', '#eee8aa'];

function SalesAnalytics() {
  const dispatch = useDispatch();
  const { stats, topProducts, salesTrend, statusDistribution, isLoading, currentTimeframe } = useSelector(state => state.sales);
  const [activeTab, setActiveTab] = useState('revenue');

  useEffect(() => {
    dispatch(getSalesStats(currentTimeframe));
  }, [dispatch, currentTimeframe]);

  const handleTimeframeChange = (tf) => {
    dispatch(setTimeframe(tf));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glass-card p-3">
          <p className="text-gold border-bottom border-gold pb-1 mb-2 fw-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="mb-0 small" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.name === 'Revenue' ? 'Rs. ' : ''}${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Container fluid className="py-4 sales-analytics animate__animated animate__fadeIn">
      {/* Header & Filters */}
      <div className="analytics-header d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
        <div className="mb-3 mb-md-0">
          <h2 className="text-gold mb-1 fw-bold">Business Intelligence</h2>
          <p className="text-muted small mb-0">Track your restaurant's growth and metrics in real-time</p>
        </div>
        
        <ButtonGroup className="timeframe-btn-group glass-card p-1">
          {['week', 'month', 'year', 'all'].map((tf) => (
            <Button 
                key={tf}
                variant="transparent"
                className={`text-capitalize ${currentTimeframe === tf ? 'active' : ''}`}
                onClick={() => handleTimeframeChange(tf)}
            >
                {tf === 'all' ? 'Lifetime' : tf}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* KPI Overview */}
      <Row className="mb-5 g-4">
        <Col md={3}>
          <Card className="metric-card h-100 border-0">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="p-2 glass-card rounded-circle">
                    <FaDollarSign className="text-gold" size={20} />
                </div>
                <Badge bg="success" className="bg-opacity-10 text-success border border-success">+12.5%</Badge>
              </div>
              <h6 className="text-muted text-uppercase small ls-1">Total Revenue</h6>
              <h2 className="text-gold mb-0">Rs. {stats.revenue.toLocaleString()}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="metric-card h-100 border-0">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="p-2 glass-card rounded-circle">
                    <FaUtensils className="text-gold" size={20} />
                </div>
                <Badge bg="info" className="bg-opacity-10 text-info border border-info">+8%</Badge>
              </div>
              <h6 className="text-muted text-uppercase small ls-1">Total Orders</h6>
              <h2 className="text-gold mb-0">{stats.orders}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="metric-card h-100 border-0">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="p-2 glass-card rounded-circle">
                    <FaChartPie className="text-gold" size={20} />
                </div>
              </div>
              <h6 className="text-muted text-uppercase small ls-1">Active Deliveries</h6>
              <h2 className="text-gold mb-0">
                {salesTrend.reduce((acc, curr) => acc + (curr.delivery || 0), 0)}
              </h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="metric-card h-100 border-0">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="p-2 glass-card rounded-circle">
                    <FaCalendarAlt className="text-gold" size={20} />
                </div>
              </div>
              <h6 className="text-muted text-uppercase small ls-1">Avg. Ticket Size</h6>
              <h2 className="text-gold mb-0">
                Rs. {stats.orders > 0 ? (stats.revenue / stats.orders).toFixed(0) : 0}
              </h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        {/* Main Growth Area Chart */}
        <Col lg={8}>
          <Card className="chart-card p-4 border-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-gold mb-0">Revenue Growth Trend</h5>
                <ButtonGroup className="glass-card">
                    <Button 
                        size="sm" 
                        variant="transparent" 
                        className={activeTab === 'revenue' ? 'text-gold' : 'text-muted'}
                        onClick={() => setActiveTab('revenue')}
                    >Revenue</Button>
                    <Button 
                        size="sm" 
                        variant="transparent" 
                        className={activeTab === 'orders' ? 'text-gold' : 'text-muted'}
                        onClick={() => setActiveTab('orders')}
                    >Order Status</Button>
                </ButtonGroup>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              {activeTab === 'revenue' ? (
                <AreaChart data={salesTrend}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis vertical={false} dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis vertical={false} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" name="Revenue" dataKey="revenue" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              ) : (
                <BarChart data={salesTrend}>
                  <CartesianGrid vertical={false} />
                  <XAxis vertical={false} dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis vertical={false} stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" />
                  <Bar name="Delivered" dataKey="delivered" stackId="a" fill="#28a745" radius={[0, 0, 0, 0]} />
                  <Bar name="Delivery" dataKey="delivery" stackId="a" fill="#6f42c1" />
                  <Bar name="Preparing" dataKey="preparing" stackId="a" fill="#17a2b8" />
                  <Bar name="Placed" dataKey="pending" stackId="a" fill="#ffc107" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Status Distribution Pie */}
        <Col lg={4}>
          <Card className="chart-card p-4 border-0 text-center">
            <h5 className="text-gold mb-5">Order Distribution</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={
                            entry.name === 'Delivered' ? '#28a745' : 
                            entry.name === 'Preparing' ? '#17a2b8' : 
                            entry.name === 'Out for Delivery' ? '#6f42c1' : '#ffc107'
                        } 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 text-start px-3">
                {statusDistribution.map((s, i) => (
                    <div key={i} className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small text-muted">
                            <span className="status-badge" style={{
                                backgroundColor: 
                                s.name === 'Delivered' ? '#28a745' : 
                                s.name === 'Preparing' ? '#17a2b8' : 
                                s.name === 'Out for Delivery' ? '#6f42c1' : '#ffc107'
                            }}></span>
                            {s.name}
                        </span>
                        <span className="text-gold fw-bold">{s.value}</span>
                    </div>
                ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Signature Items Ranking */}
      <Row className="g-4">
          <Col md={12}>
            <Card className="chart-card p-4 border-0">
                <h5 className="text-gold mb-4">Legendary Signature Ranking</h5>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart layout="vertical" data={topProducts}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="#d4af37" fontSize={11} width={100} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="value" fill="#d4af37" radius={[0, 4, 4, 0]} barSize={20}>
                                    {topProducts.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fillOpacity={1 - index * 0.15} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                    <Col lg={6}>
                        <div className="px-lg-5">
                            <p className="text-muted small">Your top selling items contribute to <span className="text-gold fw-bold">64%</span> of your total revenue this timeframe. Consider running a weekend promotion on the top performing dishes to maximize volume.</p>
                            <div className="d-flex flex-wrap gap-2 mt-4">
                                {topProducts.map((p, i) => (
                                    <Badge key={i} className="glass-card p-2 text-gold border border-gold border-opacity-10 ls-1">
                                        #{i+1} {p.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
          </Col>
      </Row>
    </Container>
  );
}

export default SalesAnalytics;
