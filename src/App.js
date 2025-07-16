import React, { useState, useCallback, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronRight, Mail, MessageSquare, CheckCircle, Eye, MousePointerClick, Calendar, Clock, XCircle, Sparkles, Gift, Globe, Smartphone, Send, TrendingUp, Target, User, Shield, FileText, Megaphone, Zap, BarChart2, Edit3, Settings, Phone, Mic, Clipboard, Ticket, ChevronsUpDown } from 'lucide-react';

// --- Branding Colors ---
const aiaColors = {
  primary: '#D31145', // AIA Red
  primaryDark: '#b70f3b',
  primaryLight: '#fdedf1',
  secondary: '#E85B81',
  textPrimary: '#333333',
  textSecondary: '#6b7280',
  background: '#f8fafc',
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
  { id: 1, name: 'Ice Pongsathon', filter: 'Single Policy', policyType: 'Life Insurance', premium: 1200, policyNo: 'T123xxx456', sumAssured: 50000, nextDueDate: '2025-01-15', segmentation: 'Young Professional' },
  { id: 2, name: 'Jane Smith', filter: 'Maturity', policyType: 'Life Insurance', maturityDate: '2025-08-15', policyNo: 'T123xxx789', sumAssured: 250000, nextDueDate: '2025-08-01', segmentation: 'Pre-Retiree' },
  { id: 3, name: 'Peter Jones', filter: 'Single Policy', policyType: 'Health Insurance', premium: 1800, policyNo: 'T111456', sumAssured: 300000, nextDueDate: '2025-11-20', segmentation: 'Family Head' },
  { id: 4, name: 'Mary Williams', filter: 'High Value', policyType: 'PA Policy', premium: 3500, policyNo: 'T123xxx012', sumAssured: 1000000, nextDueDate: '2025-09-10', segmentation: 'High Net Worth' },
  { id: 5, name: 'David Brown', filter: 'Maturity', policyType: 'Annuity', maturityDate: '2025-09-01', policyNo: 'T199xxx456', sumAssured: 150000, nextDueDate: '2025-08-25', segmentation: 'Retiree' },
  { id: 6, name: 'Sarah Miller', filter: 'Single Policy', policyType: 'Health Insurance', premium: 950, policyNo: 'T123xxx106', sumAssured: 75000, nextDueDate: '2025-12-05', segmentation: 'Young Professional' },
  { id: 7, name: 'Michael Davis', filter: 'High Value', policyType: 'Life Insurance', premium: 5000, policyNo: 'T123xxx001', sumAssured: 1500000, nextDueDate: '2026-02-01', segmentation: 'High Net Worth' },
  { id: 8, name: 'Emily Garcia', filter: 'Maturity', policyType: 'Endowment Plan', maturityDate: '2025-07-25', policyNo: 'T002xxx456', sumAssured: 100000, nextDueDate: '2025-07-20', segmentation: 'Pre-Retiree' },
  { id: 9, name: 'Chris Lee', filter: 'Single Policy', policyType: 'Life Insurance', premium: 1500, policyNo: 'T234xxx567', sumAssured: 100000, nextDueDate: '2026-03-10', segmentation: 'Young Professional' },
  { id: 10, name: 'Olivia Martinez', filter: 'High Value', policyType: 'Investment Linked', premium: 6000, policyNo: 'T345xxx678', sumAssured: 2000000, nextDueDate: '2025-10-15', segmentation: 'High Net Worth' },
  { id: 11, name: 'Daniel Rodriguez', filter: 'Maturity', policyType: 'Life Insurance', maturityDate: '2025-11-05', policyNo: 'T456xxx789', sumAssured: 300000, nextDueDate: '2025-10-20', segmentation: 'Pre-Retiree' },
  { id: 12, name: 'Sophia Hernandez', filter: 'Single Policy', policyType: 'Health Insurance', premium: 1100, policyNo: 'T567xxx890', sumAssured: 90000, nextDueDate: '2026-01-25', segmentation: 'Family Head' },
];

const customerProfileData = {
    1: {
        aiSummary: {
            segmentation: 'Young Professional, Tech Savvy',
            coverageSummary: 'Currently holds a basic life insurance policy. Solid foundation but lacks critical illness and long-term savings components.',
            protectionGaps: 'Significant gap in critical illness coverage. No retirement or long-term investment plan in place.',
            claimFrequency: 'Low. No claims filed in the last 5 years.'
        },
        aiRecommendation: {
            journey: 'Critical Illness Awareness',
            isReadyToBuy: true,
            salesTalk: {
                opening: "Hi Ice, I was reviewing your portfolio and noticed you've built a great foundation with your life policy. Have you considered how to protect your income if you were unable to work due to a serious illness?",
                keyPoints: [
                    "Critical illness plans provide a lump-sum payment upon diagnosis.",
                    "This can cover medical bills, daily expenses, and replace lost income.",
                    "Our plans are flexible and can be tailored to your budget and needs."
                ],
                closing: "Would you be open to a 15-minute chat next week to explore how this could fit into your financial plan?"
            }
        }
    },
    2: {
        aiSummary: {
            segmentation: 'Pre-Retiree, Conservative Investor',
            coverageSummary: 'Long-term life policy is maturing soon. Has a small health plan.',
            protectionGaps: 'Post-retirement income stream is not defined. Health coverage may be insufficient for future needs.',
            claimFrequency: 'None.'
        },
        aiRecommendation: {
            journey: 'Retirement Planning',
            isReadyToBuy: false,
        }
    }
}

const engagementJourneys = {
  1: {
    customerName: 'Ice Pongsathon',
    journeys: [
        {
            name: 'Onboarding Journey',
            status: 'Completed',
            nodes: [
              { day: 1, type: 'content', title: 'Welcome & Onboarding', status: 'Sent', date: '2024-07-10', time: '09:15 AM', content: { image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1', url: 'https://your-agency.com/welcome/johndoe', caption: "Hi Ice, welcome to our agency! Here's your digital welcome kit to get you started. We're thrilled to have you.", aiSuggestions: ["Welcome aboard, Ice! We're excited to protect what matters most to you. Your welcome kit is ready for you here."], recommendedTime: "Today at 4:30 PM" } },
              { day: 7, type: 'call', title: 'First Week Follow-up Call', status: 'Completed', date: '2024-07-17', time: '11:30 AM', content: {
                  script: {
                      opening: "Hi Ice, it's Alex from AIA. How are you finding everything after the first week?",
                      keyPoints: ["Confirm he received the welcome kit.", "Ask if he has any initial questions about his policy.", "Remind him about the AIA+ app for easy policy management."],
                      closing: "Great! Don't hesitate to reach out if anything comes up. Have a great day!"
                  },
                  recommendedTime: "Tomorrow at 11:00 AM"
              }},
              { day: 14, type: 'content', title: 'Value-add Content', status: 'Sent', date: '2024-07-24', time: '10:00 AM', content: { image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1', url: 'https://your-agency.com/financial-tips/johndoe', caption: "Here are 3 quick tips for long-term financial planning. Hope you find it useful!", aiSuggestions: ["Planning for the future is key. Here are some tips to get you started."], recommendedTime: "Wednesday at 10:00 AM" } },
            ]
        },
        {
            name: 'Critical Illness (CI) Booster',
            status: 'Pending',
            nodes: [
              { day: 1, type: 'content', title: 'Intro to CI Protection', status: 'Pending', date: null, time: null, content: { image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1', url: 'https://your-agency.com/ci-info/johndoe', caption: "Protecting your income is as important as protecting your life. Here's some info on how Critical Illness coverage can secure your finances.", aiSuggestions: ["Health is wealth. Here's a quick look at why CI coverage is a cornerstone of a solid financial plan."], recommendedTime: "Friday at 2:15 PM" } },
              { day: 15, type: 'event', title: 'Wealth & Health Seminar', status: 'Pending', date: null, time: null, content: {
                  eventName: "Wealth & Health Seminar",
                  eventDate: "August 15, 2025",
                  eventLocation: "AIA Tower, Bangkok",
                  invitationText: "We'd be delighted for you to join our exclusive seminar on building a healthy financial future. Learn from experts and enjoy a complimentary dinner.",
                  recommendedTime: "2 weeks before event"
              }},
              { day: 30, type: 'content', title: 'CI Success Story', status: 'Pending', date: null, time: null, content: { image: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1', url: 'https://your-agency.com/ci-story/johndoe', caption: "See how having the right coverage made a difference for one of our clients. A truly inspiring story.", aiSuggestions: ["Real stories, real impact. See how CI coverage helped a family in their time of need."], recommendedTime: "Monday at 9:30 AM" } },
            ]
        }
    ]
  },
  2: {
    customerName: 'Jane Smith',
    journeys: [
        {
            name: 'Maturity Journey',
            status: 'Pending',
            nodes: [
                { day: 1, type: 'content', title: 'Maturity Approaching', status: 'Sent', date: '2024-07-01', time: '10:00 AM', content: { image: 'https://placehold.co/600x400/fdedf1/D31145?text=Big+Day+Soon!', url: 'https://your-agency.com/maturity/janesmith', caption: "Hi Jane, your policy is maturing soon! Let's connect to discuss your options and ensure a smooth process.", aiSuggestions: ["Exciting news, Jane! Your policy is nearing its maturity date. I'd love to walk you through the next steps and your options."], recommendedTime: "Today at 3:00 PM" } },
                { day: 15, type: 'content', title: 'Re-investment Options', status: 'Pending', date: null, time: null, content: { image: 'https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1', url: 'https://your-agency.com/reinvest/janesmith', caption: "Let's make your money work harder. Here are some top re-investment options to consider for your matured funds.", aiSuggestions: ["Ready for your next financial chapter? Explore these smart re-investment opportunities."], recommendedTime: "Tomorrow at 2:00 PM" } },
            ]
        }
    ]
  },
};

const customerInteractions = {
    1: {
        recommendation: {
            intent: 'High Intent to Buy',
            summary: 'Ice has actively engaged with all outreach, visited the policy details page, and used the app. This indicates a strong interest in his current and potentially new products.',
            nextBestAction: 'Initiate a conversation about a High Net Worth product.'
        },
        timeline: [
            { type: 'Application', description: 'Used premium calculator for Critical Illness', time: '2024-07-16 11:45 AM' },
            { type: 'Website', description: 'Viewed "Critical Illness" product page for 8 minutes', time: '2024-07-16 11:37 AM' },
            { type: 'Email', description: 'Clicked link in "Policy Review & Cross-sell" email', time: '2024-07-15 02:05 PM' },
            { type: 'Application', description: 'Logged into the AIA+ application', time: '2024-07-12 03:00 PM' },
            { type: 'Website', description: 'Visited personalized welcome page', time: '2024-07-10 09:26 AM' },
            { type: 'Email', description: 'Opened "Welcome & Onboarding" email', time: '2024-07-10 09:25 AM' },
        ]
    },
    2: {
        recommendation: {
            intent: 'Medium Intent',
            summary: 'Jane is responsive and has explored re-investment options, but her activity is focused solely on her maturing policy. She shows potential for new products but needs more nurturing.',
            nextBestAction: 'Send a follow-up with a clear comparison of two top re-investment options.'
        },
        timeline: [
            { type: 'Application', description: 'Used the premium calculator tool', time: '2024-07-18 11:00 AM' },
            { type: 'Website', description: 'Viewed re-investment options page', time: '2024-07-16 04:00 PM' },
            { type: 'LINE', description: 'Replied to agent\'s message', time: '2024-07-02 08:00 AM' },
            { type: 'Email', description: 'Opened "Maturity Approaching" email', time: '2024-07-01 10:15 AM' },
        ]
    }
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

const CustomerList = ({ onCustomerSelect, selectedCustomerId, isSidePanel = false }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Single Policy', 'Maturity', 'High Value'];

  const filteredCustomers = activeFilter === 'All'
    ? allCustomers
    : allCustomers.filter(c => c.filter === activeFilter);

  if (isSidePanel) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-4" style={{color: aiaColors.textPrimary}}>Customer List</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${activeFilter === filter ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                style={activeFilter === filter ? { backgroundColor: aiaColors.primary } : {}}
              >
                {filter}
              </button>
            ))}
          </div>
        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-300px)]">
          {filteredCustomers.map(customer => (
            <div
              key={customer.id}
              onClick={() => onCustomerSelect(customer.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedCustomerId === customer.id ? 'bg-red-100' : 'hover:bg-gray-50'}`}
              style={selectedCustomerId === customer.id ? {borderLeft: `4px solid ${aiaColors.primary}`} : {borderLeft: '4px solid transparent'}}
            >
              <p className={`font-bold text-sm ${selectedCustomerId === customer.id ? 'text-red-700' : 'text-gray-800'}`}>{customer.name}</p>
              <p className="text-xs text-gray-500">{customer.policyType}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg mt-8" style={{backgroundColor: aiaColors.surface}}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0" style={{color: aiaColors.textPrimary}}>Customer List</h3>
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
            className="p-4 bg-gray-50 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
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

const Dashboard = ({ onCustomerSelect }) => {
    const agentCodes = ['0000054509', '0000012345', '0000067890', '0000098765', '0000054321'];
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
            <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500">
                    {agentCodes.map(code => <option key={code}>{code}</option>)}
                </select>
                <ChevronsUpDown className="h-4 w-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"/>
            </div>
            <h1 className="text-3xl font-extrabold" style={{color: aiaColors.textPrimary}}>Welcome back Agent!</h1>
        </div>
        <CustomerChart />
        <CustomerList onCustomerSelect={onCustomerSelect} />
      </div>
    );
};

// --- Customer Profile Page Components ---

const SalesTalkModal = ({ salesTalk, onClose }) => {
    if (!salesTalk) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold" style={{color: aiaColors.primary}}>AI Sales Talk Assistant</h3>
                    <button onClick={onClose}><XCircle className="h-6 w-6 text-gray-400 hover:text-gray-600"/></button>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                        <h4 className="font-bold text-gray-800">Opening Line:</h4>
                        <p className="text-gray-600 mt-1 italic">"{salesTalk.opening}"</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">Key Talking Points:</h4>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-600">
                            {salesTalk.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">Suggested Closing:</h4>
                        <p className="text-gray-600 mt-1 italic">"{salesTalk.closing}"</p>
                    </div>
                </div>
                 <div className="p-4 bg-gray-50 border-t text-right">
                    <button onClick={onClose} className="px-4 py-2 text-white rounded-lg font-semibold transition-colors shadow" style={{backgroundColor: aiaColors.primary}}>Close</button>
                </div>
            </div>
        </div>
    );
};

const CustomerDetailsTab = ({ profileData, onStartJourney, onOpenSalesTalk }) => {
    if (!profileData) return <div className="p-8 text-center text-gray-500">No customer details available.</div>;
    const { aiSummary, aiRecommendation } = profileData;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-1">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full" style={{backgroundColor: aiaColors.primaryLight}}><Sparkles className="h-6 w-6" style={{color: aiaColors.primary}}/></div>
                    <h3 className="text-xl font-bold" style={{color: aiaColors.textPrimary}}>AI Summary</h3>
                </div>
                <div className="space-y-3 text-sm">
                    <p><strong className="font-semibold text-gray-700">Segmentation:</strong> {aiSummary.segmentation}</p>
                    <p><strong className="font-semibold text-gray-700">Coverage Summary:</strong> {aiSummary.coverageSummary}</p>
                    <p><strong className="font-semibold text-gray-700">Protection Gaps:</strong> {aiSummary.protectionGaps}</p>
                    <p><strong className="font-semibold text-gray-700">Claim Frequency:</strong> {aiSummary.claimFrequency}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full" style={{backgroundColor: aiaColors.primaryLight}}><Target className="h-6 w-6" style={{color: aiaColors.primary}}/></div>
                    <h3 className="text-xl font-bold" style={{color: aiaColors.textPrimary}}>AI Recommendation</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="font-semibold text-gray-700">Recommended Journey:</p>
                        <p className="text-gray-600">{aiRecommendation.journey}</p>
                        <button onClick={onStartJourney} className="mt-2 text-sm font-bold py-2 px-4 rounded-lg text-white transition-transform hover:scale-105" style={{backgroundColor: aiaColors.primary}}>
                            Start Journey
                        </button>
                    </div>
                    {aiRecommendation.isReadyToBuy && (
                        <div className="border-t pt-4">
                            <p className="font-semibold text-gray-700">Purchase Intent:</p>
                            <p className="text-green-600 font-bold">High - Ready to Buy!</p>
                             <button onClick={onOpenSalesTalk} className="mt-2 text-sm font-bold py-2 px-4 rounded-lg text-white transition-transform hover:scale-105" style={{backgroundColor: aiaColors.secondary}}>
                                Open Sales Talk
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PlaceholderTab = ({ title }) => (
    <div className="p-8 text-center text-gray-400 bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-semibold">This is the {title} tab.</h3>
        <p>Content for this section is under development.</p>
    </div>
);

const EditableField = ({ label, value, onChange }) => (
    <div className="relative">
        <label className="text-xs text-gray-500">{label}</label>
        <input 
            type="text"
            value={value}
            onChange={onChange}
            className="w-full text-sm p-1 bg-gray-100 rounded-md border border-transparent hover:border-gray-300 focus:bg-white focus:border-red-300 focus:ring-1 focus:ring-red-200 outline-none transition"
        />
    </div>
);

const JourneyStatusBadge = ({ status, date, time }) => {
    const statusInfo = {
        Sent: { icon: <Send className="h-3 w-3" />, color: 'text-blue-800 bg-blue-100' },
        Opened: { icon: <Eye className="h-3 w-3" />, color: 'text-green-800 bg-green-100' },
        Clicked: { icon: <MousePointerClick className="h-3 w-3" />, color: 'text-purple-800 bg-purple-100' },
        Pending: { icon: <Clock className="h-3 w-3" />, color: 'text-yellow-800 bg-yellow-100' },
        Completed: { icon: <CheckCircle className="h-3 w-3" />, color: 'text-green-800 bg-green-100' },
    };
    const currentStatus = statusInfo[status] || statusInfo.Pending;
    if (status === 'Pending') return <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>{currentStatus.icon} <span>Pending</span></div>;
    return (
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
            {currentStatus.icon}
            <span>{status} on {date}</span>
        </div>
    );
};

const ContentNode = ({ node, onAction }) => {
  const [caption, setCaption] = useState(node.content.caption);
  const [imageUrl, setImageUrl] = useState(node.content.image);
  const [personalizedUrl, setPersonalizedUrl] = useState(node.content.url);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCaption = () => {
    setIsGenerating(true);
    const suggestions = node.content.aiSuggestions || [];
    if (suggestions.length > 0) {
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * suggestions.length);
            setCaption(suggestions[randomIndex]);
            setIsGenerating(false);
        }, 1500);
    } else {
        setTimeout(() => {
            setCaption("AI is thinking of something great to say...");
            setIsGenerating(false);
        }, 1500);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-lg text-gray-800">{node.title}</h4>
            <JourneyStatusBadge status={node.status} date={node.date} time={node.time} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
                <div className="relative group">
                    <img src={imageUrl} alt={node.title} className="rounded-lg object-cover w-full h-40" 
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-opacity cursor-pointer">
                        <Edit3 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </div>
                </div>
                <EditableField label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className="space-y-3">
                <EditableField label="Personalized URL" value={personalizedUrl} onChange={(e) => setPersonalizedUrl(e.target.value)} />
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs text-gray-500">Editable Caption</label>
                        <button onClick={handleGenerateCaption} disabled={isGenerating} className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md transition-colors" style={{color: aiaColors.primary, backgroundColor: aiaColors.primaryLight}}>
                            <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                            {isGenerating ? '...' : 'AI'}
                        </button>
                    </div>
                    <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows="4" className={`w-full p-2 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-red-300 ${isGenerating ? 'animate-pulse' : 'border-gray-200'}`}/>
                </div>
            </div>
        </div>
        <div className="mt-4 border-t pt-4 flex justify-between items-center">
             <div className="flex items-center gap-2 text-xs text-gray-500">
                <Gift className="h-4 w-4" style={{color: aiaColors.primary}} />
                <span>Recommended Time: <span className="font-semibold">{node.content.recommendedTime}</span></span>
            </div>
            <div className="flex gap-2">
                <button onClick={() => onAction('Email', node, caption)} className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow text-sm"><Mail className="h-4 w-4" /> Email</button>
                <button onClick={() => onAction('LINE', node, caption)} className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow text-sm"><MessageSquare className="h-4 w-4" /> LINE</button>
            </div>
        </div>
    </div>
  );
};

const CallNode = ({ node, onAction }) => (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-lg text-gray-800">{node.title}</h4>
            <JourneyStatusBadge status={node.status} date={node.date} time={node.time} />
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
                <Mic className="h-5 w-5" style={{color: aiaColors.primary}}/>
                <h5 className="font-bold text-gray-800">Call Script</h5>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
                <p><strong className="font-semibold">Opening:</strong> {node.content.script.opening}</p>
                <div>
                    <strong className="font-semibold">Key Points:</strong>
                    <ul className="list-disc list-inside ml-2">
                        {node.content.script.keyPoints.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                </div>
                <p><strong className="font-semibold">Closing:</strong> {node.content.script.closing}</p>
            </div>
        </div>
        <div className="mt-4 border-t pt-4 flex justify-between items-center">
             <div className="flex items-center gap-2 text-xs text-gray-500">
                <Gift className="h-4 w-4" style={{color: aiaColors.primary}} />
                <span>Recommended Time: <span className="font-semibold">{node.content.recommendedTime}</span></span>
            </div>
            <button onClick={() => onAction('Log Call', node)} className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 shadow text-sm"><Phone className="h-4 w-4" /> Log Call Outcome</button>
        </div>
    </div>
);

const EventNode = ({ node, onAction }) => (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-lg text-gray-800">{node.title}</h4>
            <JourneyStatusBadge status={node.status} date={node.date} time={node.time} />
        </div>
        <div className="p-4 bg-gray-50 rounded-lg border-l-4" style={{borderColor: aiaColors.secondary}}>
            <div className="flex items-center gap-3 mb-3">
                <Ticket className="h-5 w-5" style={{color: aiaColors.primary}}/>
                <h5 className="font-bold text-gray-800">{node.content.eventName}</h5>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
                <p><strong className="font-semibold">Date:</strong> {node.content.eventDate}</p>
                <p><strong className="font-semibold">Location:</strong> {node.content.eventLocation}</p>
                <p className="pt-2 italic">"{node.content.invitationText}"</p>
            </div>
        </div>
        <div className="mt-4 border-t pt-4 flex justify-between items-center">
             <div className="flex items-center gap-2 text-xs text-gray-500">
                <Gift className="h-4 w-4" style={{color: aiaColors.primary}} />
                <span>Recommended Time: <span className="font-semibold">{node.content.recommendedTime}</span></span>
            </div>
            <button onClick={() => onAction('Invite', node)} className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 shadow text-sm"><Send className="h-4 w-4" /> Send Invitation</button>
        </div>
    </div>
);

const JourneyRenderer = ({ journey, onAction }) => {
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const activeNode = journey.nodes[activeDayIndex];

    const journeyStatusColor = journey.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

    const renderNode = () => {
        switch(activeNode.type) {
            case 'content': return <ContentNode node={activeNode} onAction={onAction} />;
            case 'call': return <CallNode node={activeNode} onAction={onAction} />;
            case 'event': return <EventNode node={activeNode} onAction={onAction} />;
            default: return <p>Unknown engagement type.</p>;
        }
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-bold" style={{color: aiaColors.textPrimary}}>{journey.name}</h3>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${journeyStatusColor}`}>{journey.status}</span>
                <button className="text-gray-400 hover:text-gray-600"><Settings className="h-4 w-4"/></button>
            </div>
            <div className="flex border-b border-gray-200 mb-4">
                {journey.nodes.map((node, index) => (
                    <button 
                        key={index}
                        onClick={() => setActiveDayIndex(index)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeDayIndex === index ? 'border-b-2 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                        style={activeDayIndex === index ? {borderColor: aiaColors.primary, color: aiaColors.primary} : {}}
                    >
                        Day {node.day}
                    </button>
                ))}
            </div>
            {renderNode()}
        </div>
    );
};

const AIRecommendationInteraction = ({ recommendation }) => {
    if (!recommendation) return null;
    const intentColor = recommendation.intent === 'High Intent to Buy' ? 'text-green-600 bg-green-100' : 'text-amber-600 bg-amber-100';
    return (
        <div className="bg-white p-5 rounded-xl shadow-md mb-8 border-l-4" style={{borderColor: aiaColors.primary}}>
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full" style={{backgroundColor: aiaColors.primaryLight}}><Sparkles className="h-6 w-6" style={{color: aiaColors.primary}}/></div>
                <h3 className="text-xl font-bold" style={{color: aiaColors.textPrimary}}>AI Recommendation</h3>
            </div>
            <div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-gray-500" /><p className={`font-semibold px-3 py-1 rounded-full text-sm ${intentColor}`}>{recommendation.intent}</p></div>
            <p className="text-gray-600 my-3">{recommendation.summary}</p>
            <div className="bg-gray-50 p-3 rounded-lg flex items-start gap-3">
                <Target className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                    <p className="font-bold text-sm text-gray-800">Next Best Action</p>
                    <p className="text-sm text-gray-600">{recommendation.nextBestAction}</p>
                </div>
            </div>
        </div>
    );
};

const CustomerInteractionTimeline = ({ interactions }) => {
    const interactionIcons = { Email: { icon: <Send className="h-5 w-5 text-blue-500" />, color: 'bg-blue-100' }, LINE: { icon: <MessageSquare className="h-5 w-5 text-green-500" />, color: 'bg-green-100' }, Website: { icon: <Globe className="h-5 w-5 text-indigo-500" />, color: 'bg-indigo-100' }, Application: { icon: <Smartphone className="h-5 w-5 text-sky-500" />, color: 'bg-sky-100' } };
    if (!interactions || interactions.length === 0) return <div className="text-center py-12 text-gray-500"><p>No recent customer interactions found.</p></div>;
    return (
        <div className="relative p-4">
            {interactions.map((item, index) => (
                <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${interactionIcons[item.type]?.color || 'bg-gray-100'}`}>{interactionIcons[item.type]?.icon || <Gift className="h-5 w-5 text-gray-500" />}</div>
                        {index < interactions.length - 1 && <div className="w-px h-full bg-gray-300 my-2"></div>}
                    </div>
                    <div className="flex-grow pb-8">
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <p className="font-semibold text-gray-800">{item.description}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.time}</p>
                        </div>
                    </div>
                </div>
            ))}
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

const CustomerProfile = ({ customerId, onBack, onCustomerSelect }) => {
  const [customer, setCustomer] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [journeyData, setJourneyData] = useState(null);
  const [interactionsData, setInteractionsData] = useState({ recommendation: null, timeline: [] });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showSalesTalk, setShowSalesTalk] = useState(false);
  const [linePreviewData, setLinePreviewData] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    setCustomer(allCustomers.find(c => c.id === customerId));
    setProfileData(customerProfileData[customerId]);
    setJourneyData(engagementJourneys[customerId]);
    setInteractionsData(customerInteractions[customerId] || { recommendation: null, timeline: [] });
    setActiveTab('details'); // Reset to details tab on customer change
  }, [customerId]);

  const handleConfirmSend = useCallback((method) => {
    setModalMessage(`Action "${method}" logged successfully!`);
    setShowConfirmModal(true);
    setLinePreviewData(null);
    setTimeout(() => setShowConfirmModal(false), 2000);
  }, []);

  const handleNodeAction = useCallback((actionType, node, caption) => {
    if (actionType === 'LINE') {
        setLinePreviewData({ node, caption });
    } else {
        handleConfirmSend(actionType);
    }
  }, [handleConfirmSend]);

  const tabs = [
      { id: 'details', label: 'Customer Details', icon: User },
      { id: 'policies', label: 'Policies', icon: Shield },
      { id: 'claims', label: 'Claims', icon: FileText },
      { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
      { id: 'journey', label: 'Engagement Journey', icon: Zap },
      { id: 'interactions', label: 'Customer Interactions', icon: BarChart2 },
  ];

  if (!customer) return <div className="p-8 text-center">Loading customer profile...</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8">
        <button onClick={onBack} className="mb-6 font-semibold" style={{color: aiaColors.primary}}>&larr; Back to Dashboard</button>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="lg:col-span-1 xl:col-span-1">
                <CustomerList onCustomerSelect={onCustomerSelect} selectedCustomerId={customerId} isSidePanel={true} />
            </div>
            <div className="lg:col-span-2 xl:col-span-3">
                <h1 className="text-3xl font-extrabold" style={{color: aiaColors.textPrimary}}>{customer.name}</h1>
                <p className="mb-8" style={{color: aiaColors.textSecondary}}>Customer Profile</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 mb-6">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                    className={`py-3 px-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${isActive ? 'shadow-lg text-white' : 'text-gray-600 bg-white hover:bg-gray-100'}`}
                                    style={isActive ? {backgroundColor: aiaColors.primary} : {}}
                                > <Icon className="h-5 w-5"/> {tab.label} </button>
                            );
                        })}
                </div>

                <div className="mt-4">
                    {activeTab === 'details' && <CustomerDetailsTab profileData={profileData} onStartJourney={() => setActiveTab('journey')} onOpenSalesTalk={() => setShowSalesTalk(true)} />}
                    {activeTab === 'policies' && <PlaceholderTab title="Policies" />}
                    {activeTab === 'claims' && <PlaceholderTab title="Claims" />}
                    {activeTab === 'campaigns' && <PlaceholderTab title="Campaigns" />}
                    {activeTab === 'journey' && (
                        <div className="space-y-8">
                            {journeyData?.journeys?.length > 0 ? journeyData.journeys.map((journey, idx) => (
                            <JourneyRenderer key={idx} journey={journey} onAction={handleNodeAction} />
                            )) : <PlaceholderTab title="Engagement Journey"/>}
                        </div>
                    )}
                    {activeTab === 'interactions' && (
                        <>
                            <AIRecommendationInteraction recommendation={interactionsData.recommendation} />
                            <CustomerInteractionTimeline interactions={interactionsData.timeline} />
                        </>
                    )}
                </div>
            </div>
        </div>
      
      {showConfirmModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white p-6 rounded-lg shadow-xl text-center"><CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" /><p className="text-lg font-semibold">{modalMessage}</p></div></div>}
      {showSalesTalk && <SalesTalkModal salesTalk={profileData?.aiRecommendation?.salesTalk} onClose={() => setShowSalesTalk(false)} />}
      {linePreviewData && <LinePreviewModal node={linePreviewData.node} caption={linePreviewData.caption} onClose={() => setLinePreviewData(null)} onConfirmSend={() => handleConfirmSend('LINE')} />}
    </div>
  );
};

const Modal = ({ title, message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
        <XCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button onClick={onClose} className="px-6 py-2 text-white rounded-lg shadow transition-colors duration-200" style={{backgroundColor: aiaColors.primary, color: 'white'}}>Close</button>
      </div>
    </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCustomerSelect = (customerId) => {
    if (allCustomers.find(c => c.id === customerId)) {
        setSelectedCustomerId(customerId);
        setCurrentPage('profile');
    } else {
        setShowErrorModal(true);
    }
  };

  const handleProfileCustomerSwitch = (customerId) => {
      setSelectedCustomerId(customerId);
  }

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedCustomerId(null);
  };

  return (
    <main style={{backgroundColor: aiaColors.background}} className="min-h-screen font-sans">
      <div className="container mx-auto max-w-screen-xl">
        {currentPage === 'dashboard' && <Dashboard onCustomerSelect={handleCustomerSelect} />}
        {currentPage === 'profile' && <CustomerProfile customerId={selectedCustomerId} onBack={handleBackToDashboard} onCustomerSelect={handleProfileCustomerSwitch} />}
      </div>
      {showErrorModal && <Modal title="Journey Not Found" message="No engagement journey is available for this customer yet." onClose={() => setShowErrorModal(false)} />}
    </main>
  );
}
