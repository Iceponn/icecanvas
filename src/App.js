import React, { useState, useCallback, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronRight, Mail, MessageSquare, CheckCircle, Eye, MousePointerClick, Calendar, Clock, XCircle, Sparkles, Gift } from 'lucide-react';

// --- Branding Colors ---
const aiaColors = {
  primary: '#D31145', // AIA Red
  primaryDark: '#b70f3b',
  primaryLight: '#fdedf1',
  secondary: '#E85B81',
  textPrimary: '#333333',
  textSecondary: '#6b7280',
  background: '#f9fafb',
  surface: '#ffffff',
};

// --- Mock Data ---
const mockAgent = {
    name: 'AIA Thailand',
    title: 'From Agent Alex',
    imageUrl: 'https://cdn2.downdetector.com/static/uploads/logo/AIA.png',
};

const mockCustomerData = [
  { name: 'Jan', customers: 4, policies: 2 },
  { name: 'Feb', customers: 3, policies: 1 },
  { name: 'Mar', customers: 5, policies: 4 },
  { name: 'Apr', customers: 7, policies: 5 },
  { name: 'May', customers: 6, policies: 6 },
  { name: 'Jun', customers: 9, policies: 7 },
];

const allCustomers = [
  { id: 1, name: 'Johnathan Doe', filter: 'Single Policy', policyType: 'Auto Insurance', premium: 1200, policyNo: 'T123xxx456', sumAssured: 50000, nextDueDate: '2025-01-15', segmentation: 'Young Professional' },
  { id: 2, name: 'Jane Smith', filter: 'Maturity', policyType: 'Life Insurance', maturityDate: '2024-08-15', policyNo: 'T123xxx789', sumAssured: 250000, nextDueDate: '2024-08-01', segmentation: 'Pre-Retiree' },
  { id: 3, name: 'Peter Jones', filter: 'Single Policy', policyType: 'Home Insurance', premium: 1800, policyNo: 'T111xxx456', sumAssured: 300000, nextDueDate: '2024-11-20', segmentation: 'Family Head' },
  { id: 4, name: 'Mary Williams', filter: 'High Value', policyType: 'Umbrella Policy', premium: 3500, policyNo: 'T123xxx012', sumAssured: 1000000, nextDueDate: '2024-09-10', segmentation: 'High Net Worth' },
  { id: 5, name: 'David Brown', filter: 'Maturity', policyType: 'Annuity', maturityDate: '2024-09-01', policyNo: 'T199xxx456', sumAssured: 150000, nextDueDate: '2024-08-25', segmentation: 'Retiree' },
  { id: 6, name: 'Sarah Miller', filter: 'Single Policy', policyType: 'Health Insurance', premium: 950, policyNo: 'T123xxx106', sumAssured: 75000, nextDueDate: '2024-12-05', segmentation: 'Young Professional' },
  { id: 7, name: 'Michael Davis', filter: 'High Value', policyType: 'Life Insurance', premium: 5000, policyNo: 'T123xxx001', sumAssured: 1500000, nextDueDate: '2025-02-01', segmentation: 'High Net Worth' },
  { id: 8, name: 'Emily Garcia', filter: 'Maturity', policyType: 'Endowment Plan', maturityDate: '2024-07-25', policyNo: 'T002xxx456', sumAssured: 100000, nextDueDate: '2024-07-20', segmentation: 'Pre-Retiree' },
];

const engagementJourneys = {
  1: {
    customerName: 'Johnathan Doe',
    journey: [
      { day: 1, title: 'Welcome & Onboarding', status: 'Sent', date: '2024-07-10', time: '09:15 AM', content: { image: 'https://placehold.co/600x400/fdedf1/D31145?text=Welcome+Kit', url: 'https://your-agency.com/welcome/johndoe', caption: "Hi Johnathan, welcome to our agency! Here's your digital welcome kit to get you started. We're thrilled to have you.", aiSuggestions: ["Welcome aboard, Johnathan! We're excited to protect what matters most to you. Your welcome kit is ready for you here.", "A big welcome to the family, Johnathan! Your journey to a more secure future starts now. Check out your welcome pack.", "Hello Johnathan, and thank you for choosing us. Here is your personalized welcome kit. We look forward to serving you."], recommendedTime: "Today at 4:30 PM" } },
      { day: 7, title: 'First Week Check-in', status: 'Opened', date: '2024-07-17', time: '11:30 AM', content: { image: 'https://placehold.co/600x400/d1e7dd/4a4a4a?text=Policy+Review', url: 'https://your-agency.com/policy-check/johndoe', caption: "Hope you're having a great first week! Just checking in to see if you have any questions about your new policy.", aiSuggestions: ["Hi Johnathan, just a quick check-in. How are you finding everything with your new policy? I'm here if you need anything.", "It's been a week! I wanted to see if you had any questions or if there is anything I can clarify about your coverage.", "Hope you're settling in well. Don't hesitate to reach out if any questions have come up about your policy."], recommendedTime: "Tomorrow at 11:00 AM" } },
      { day: 30, title: 'Policy Review & Cross-sell', status: 'Clicked', date: '2024-08-09', time: '02:00 PM', content: { image: 'https://placehold.co/600x400/f8d7da/4a4a4a?text=More+Coverage%3F', url: 'https://your-agency.com/more-options/johndoe', caption: "Did you know we also offer great rates on home insurance? Let's see if we can bundle and save you more!", aiSuggestions: ["As your needs evolve, your coverage should too. I noticed you have auto insurance with us - have you considered our home policies? We could save you money by bundling.", "Protecting your car is smart. Protecting your home is essential. Let's explore how bundling your insurance could lead to significant savings.", "I have an idea that could save you money. Many of our clients benefit from bundling their policies. Would you be open to a quick chat about home insurance?"], recommendedTime: "Friday at 2:15 PM" } },
      { day: 90, title: 'Quarterly Newsletter', status: 'Pending', date: null, time: null, content: { image: 'https://placehold.co/600x400/fff3cd/4a4a4a?text=Stay+Informed', url: 'https://your-agency.com/newsletter/q3', caption: "Stay up-to-date with our latest news and tips for staying protected. Here is our quarterly newsletter.", aiSuggestions: ["Your latest insights are here! Check out our quarterly newsletter for tips and updates to keep you and your family safe.", "Knowledge is power. Our new newsletter is packed with valuable information. Hope you find it useful!", "Here's a little something to keep you informed. Enjoy our latest newsletter!"], recommendedTime: "Next Monday at 9:00 AM" } },
    ]
  },
  2: {
    customerName: 'Jane Smith',
    journey: [
      { day: 1, title: 'Maturity Approaching', status: 'Sent', date: '2024-07-01', time: '10:00 AM', content: { image: 'https://placehold.co/600x400/fdedf1/D31145?text=Big+Day+Soon!', url: 'https://your-agency.com/maturity/janesmith', caption: "Hi Jane, your policy is maturing soon! Let's connect to discuss your options and ensure a smooth process.", aiSuggestions: ["Exciting news, Jane! Your policy is nearing its maturity date. I'd love to walk you through the next steps and your options.", "The big day is almost here! Your policy is maturing soon. Let's schedule a brief chat to ensure you make the most of it.", "As your policy maturity date approaches, I want to make sure you have all the information you need. Let's discuss your fantastic options."], recommendedTime: "Today at 3:00 PM" } },
      { day: 15, title: 'Re-investment Options', status: 'Opened', date: '2024-07-16', time: '03:45 PM', content: { image: 'https://placehold.co/600x400/cce7e7/4a4a4a?text=Future+Growth', url: 'https://your-agency.com/reinvest/janesmith', caption: "Have you considered your next financial goal? We have some excellent re-investment opportunities perfect for you.", aiSuggestions: ["Now that your policy has matured, let's talk about the future. I have some exciting re-investment ideas that align with your financial goals.", "Congratulations on your policy's maturity! This is a perfect time to explore new growth opportunities. Shall we look at some options together?", "What's your next big financial dream? Let's use the foundation you've built to reach even higher. I have some re-investment strategies to share."], recommendedTime: "Tomorrow at 1:30 PM" } },
      { day: 30, title: 'Final Reminder', status: 'Pending', date: null, time: null, content: { image: 'https://placehold.co/600x400/fdebd0/4a4a4a?text=Final+Steps', url: 'https://your-agency.com/final-reminder/janesmith', caption: "Just a friendly reminder about your upcoming policy maturity. Let's finalize the details!", aiSuggestions: ["Hi Jane, just a quick and friendly reminder about your policy's maturity. Let's touch base soon to finalize everything.", "Don't forget, your policy matures soon! I'm here to help with the final steps and answer any last-minute questions.", "Final call! Let's make sure everything is in order for your policy maturity. Looking forward to assisting you."], recommendedTime: "Friday at 10:00 AM" } },
    ]
  },
};


// --- Components ---

const CustomerChart = () => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg" style={{backgroundColor: aiaColors.surface}}>
    <h3 className="text-xl font-bold text-gray-800 mb-4" style={{color: aiaColors.textPrimary}}>Customer Dashboard</h3>
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={mockCustomerData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: aiaColors.textSecondary }} />
          <YAxis tick={{ fill: aiaColors.textSecondary }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
            }}
          />
          <Legend />
          <Bar dataKey="policies" fill={aiaColors.primary} name="Policies Sold" radius={[4, 4, 0, 0]} />
          <Bar dataKey="customers" fill={aiaColors.secondary} name="New Customers" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const CustomerList = ({ onCustomerSelect }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Single Policy', 'Maturity', 'High Value'];

  const filteredCustomers = activeFilter === 'All'
    ? allCustomers
    : allCustomers.filter(c => c.filter === activeFilter);

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg mt-8" style={{backgroundColor: aiaColors.surface}}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0" style={{color: aiaColors.textPrimary}}>Filters</h3>
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={activeFilter === filter ? { backgroundColor: aiaColors.primary, color: 'white' } : { backgroundColor: '#e5e7eb', color: aiaColors.textSecondary }}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 hover:opacity-90`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filteredCustomers.map(customer => (
          <div
            key={customer.id}
            onClick={() => onCustomerSelect(customer.id)}
            className="p-4 bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-50"
            style={{borderLeft: `5px solid ${aiaColors.primary}`}}
          >
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-bold text-lg" style={{color: aiaColors.primary}}>{customer.name}</p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{backgroundColor: '#FEF9C3', color: '#713F12'}}>{customer.segmentation}</span>
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400" />
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                    <p className="text-xs text-gray-500">Policy No.</p>
                    <p className="font-semibold text-gray-700">{customer.policyNo}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Policy Type</p>
                    <p className="font-semibold text-gray-700">{customer.policyType}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Sum Assured</p>
                    <p className="font-semibold text-gray-700">{customer.sumAssured.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Next Due Date</p>
                    <p className="font-semibold text-gray-700">{customer.nextDueDate}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = ({ onCustomerSelect }) => (
  <div className="p-4 sm:p-6 md:p-8">
    <h1 className="text-3xl font-extrabold mb-2" style={{color: aiaColors.textPrimary}}>Welcome Back, Agent!</h1>
    <p className="mb-8" style={{color: aiaColors.textSecondary}}>Here's your customer engagement overview.</p>
    <CustomerChart />
    <CustomerList onCustomerSelect={onCustomerSelect} />
  </div>
);

const StatusBadge = ({ status, date, time }) => {
    const statusInfo = {
        Sent: { icon: <CheckCircle className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' },
        Opened: { icon: <Eye className="h-4 w-4" />, color: 'bg-green-100 text-green-800' },
        Clicked: { icon: <MousePointerClick className="h-4 w-4" />, color: 'bg-purple-100 text-purple-800' },
        Pending: { icon: <Clock className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-800' },
    };

    const currentStatus = statusInfo[status] || statusInfo['Pending'];

    return (
        <div className="mt-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentStatus.color}`}>
                {currentStatus.icon}
                <span>{status}</span>
            </div>
            {date && time && (
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 ml-1">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{time}</span>
                    </div>
                </div>
            )}
        </div>
    );
};


const EngagementNode = ({ node, onAction }) => {
  const [caption, setCaption] = useState(node.content.caption);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCaption = () => {
    setIsGenerating(true);
    const suggestions = node.content.aiSuggestions || [];
    if (suggestions.length > 0) {
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * suggestions.length);
            setCaption(suggestions[randomIndex]);
            setIsGenerating(false);
        }, 1500); // Simulate AI thinking time
    } else {
        setTimeout(() => {
            setCaption("AI is thinking of something great to say...");
            setIsGenerating(false);
        }, 1500);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Timeline Decorator */}
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 w-20 h-8 rounded-full text-white flex items-center justify-center font-semibold text-sm" style={{backgroundColor: aiaColors.primary}}>
          Day {node.day}
        </div>
        <div className="w-px h-full bg-gray-300"></div>
      </div>

      {/* Content Card */}
      <div className="flex-grow bg-white p-5 rounded-xl shadow-md mb-8">
        <h4 className="font-bold text-lg text-gray-800">{node.title}</h4>
        <StatusBadge status={node.status} date={node.date} time={node.time} />
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-4">
                 <img src={node.content.image} alt={node.title} className="rounded-lg object-cover w-full h-auto aspect-video" 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
                 />
                 <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Personalized URL</p>
                    <a href={node.content.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-sm break-all" style={{color: aiaColors.primary}}>
                        {node.content.url}
                    </a>
                 </div>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label htmlFor={`caption-${node.day}`} className="text-sm font-medium text-gray-700">
                        Editable Caption
                    </label>
                    <button onClick={handleGenerateCaption} disabled={isGenerating} className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md transition-colors" style={{color: aiaColors.primary, backgroundColor: aiaColors.primaryLight}}>
                        <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                        {isGenerating ? 'Generating...' : 'AI Assistant'}
                    </button>
                </div>
                <textarea
                  id={`caption-${node.day}`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  onFocus={() => setIsEditing(true)}
                  onBlur={() => setIsEditing(false)}
                  rows="6"
                  className={`w-full p-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${isEditing ? 'border-red-300 ring-red-200' : 'border-gray-300'} ${isGenerating ? 'animate-pulse' : ''}`}
                  style={isEditing ? {borderColor: aiaColors.secondary} : {}}
                />
                <div className="flex flex-wrap gap-2 pt-2">
                    <button onClick={() => onAction('Email', node, caption)} className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow">
                        <Mail className="h-4 w-4" /> Send Email
                    </button>
                    <button onClick={() => onAction('LINE', node, caption)} className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow">
                        <MessageSquare className="h-4 w-4" /> Send LINE
                    </button>
                </div>
                <div className="mt-3 p-3 rounded-lg" style={{backgroundColor: aiaColors.primaryLight}}>
                    <div className="flex items-center gap-2">
                        <Gift className="h-5 w-5" style={{color: aiaColors.primary}} />
                        <p className="font-bold text-sm" style={{color: aiaColors.primary}}>Powered by AI</p>
                    </div>
                    <p className="text-sm mt-1" style={{color: aiaColors.textPrimary}}>
                        Recommended send time: <span className="font-semibold">{node.content.recommendedTime}</span>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const LinePreviewModal = ({ node, caption, onClose, onConfirmSend }) => {
    if (!node) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-bold text-center" style={{color: aiaColors.textPrimary}}>LINE Preview</h3>
                </div>
                <div className="p-4 bg-gray-200 max-h-[60vh] overflow-y-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={mockAgent.imageUrl} alt={mockAgent.name} className="w-12 h-12 rounded-full object-cover" 
                             onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/cccccc/ffffff?text=A'; }}
                        />
                        <div>
                            <p className="font-bold text-gray-800">{mockAgent.name}</p>
                            <p className="text-sm text-gray-600">{mockAgent.title}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 space-y-3">
                        <img src={node.content.image} alt={node.title} className="rounded-lg object-cover w-full h-auto aspect-video"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
                        />
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{caption}</p>
                        <a href={node.content.url} target="_blank" rel="noopener noreferrer" className="text-sm break-all" style={{color: aiaColors.primary}}>
                            {node.content.url}
                        </a>
                    </div>
                </div>
                <div className="p-4 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirmSend}
                        className="flex-1 px-4 py-2 text-white rounded-lg font-semibold transition-colors shadow"
                        style={{backgroundColor: aiaColors.primary, hover: {backgroundColor: aiaColors.primaryDark}}}
                    >
                        Confirm Send
                    </button>
                </div>
            </div>
        </div>
    );
};

const EngagementCanvas = ({ customerId, onBack }) => {
  const [journeyData, setJourneyData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [linePreviewData, setLinePreviewData] = useState(null);

  useEffect(() => {
    const data = engagementJourneys[customerId] || { customerName: 'Unknown Customer', journey: [] };
    setJourneyData(data);
  }, [customerId]);

  const handleConfirmSend = useCallback((method) => {
    setModalMessage(`Message sent via ${method}!`);
    setShowConfirmModal(true);
    setLinePreviewData(null); // Close preview modal if open
    setTimeout(() => setShowConfirmModal(false), 2000);
  }, []);

  const handleNodeAction = useCallback((actionType, node, caption) => {
    if (actionType === 'Email') {
        handleConfirmSend('Email');
    } else if (actionType === 'LINE') {
        setLinePreviewData({ node, caption });
    }
  }, [handleConfirmSend]);

  if (!journeyData) {
    return <div className="p-8 text-center">Loading engagement plan...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <button onClick={onBack} className="mb-6 font-semibold" style={{color: aiaColors.primary}}>
        &larr; Back to Dashboard
      </button>
      <h1 className="text-3xl font-extrabold" style={{color: aiaColors.textPrimary}}>{journeyData.customerName}</h1>
      <p className="mb-8" style={{color: aiaColors.textSecondary}}>Recommended Engagement Journey</p>

      <div className="relative">
        {journeyData.journey.map((node, index) => (
          <EngagementNode key={index} node={node} onAction={handleNodeAction} />
        ))}
      </div>
      
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-semibold">{modalMessage}</p>
          </div>
        </div>
      )}

      {linePreviewData && (
        <LinePreviewModal 
            node={linePreviewData.node}
            caption={linePreviewData.caption}
            onClose={() => setLinePreviewData(null)}
            onConfirmSend={() => handleConfirmSend('LINE')}
        />
      )}
    </div>
  );
};

const Modal = ({ title, message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
        <XCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button 
            onClick={onClose} 
            className="px-6 py-2 text-white rounded-lg shadow transition-colors duration-200"
            style={{backgroundColor: aiaColors.primary, color: 'white'}}
        >
            Close
        </button>
      </div>
    </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCustomerSelect = (customerId) => {
    if (engagementJourneys[customerId]) {
        setSelectedCustomerId(customerId);
        setCurrentPage('canvas');
    } else {
        setShowErrorModal(true);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedCustomerId(null);
  };

  return (
    <main style={{backgroundColor: aiaColors.background}} className="min-h-screen font-sans">
      <div className="container mx-auto max-w-7xl">
        {currentPage === 'dashboard' && <Dashboard onCustomerSelect={handleCustomerSelect} />}
        {currentPage === 'canvas' && <EngagementCanvas customerId={selectedCustomerId} onBack={handleBackToDashboard} />}
      </div>
      {showErrorModal && (
        <Modal 
            title="Journey Not Found"
            message="No engagement journey is available for this customer yet."
            onClose={() => setShowErrorModal(false)}
        />
      )}
    </main>
  );
}
