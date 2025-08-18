// // // // const sendMessageToAIAgent = require("./utils/send_message_to_AI_agent");
// // // // require('dotenv').config();

// // // // (async () => {

// // // //     const { reply, totalTokens } = await sendMessageToAIAgent(
// // // //         "Explain how AI works in a few words",
// // // //         process.env.GEMINI_API_KEY,
// // // //         "gemini-2.5-flash"
// // // //     );

// // // //     console.log("AI Reply:", reply);
// // // //     console.log("Total Tokens Used:", totalTokens);
// // // // })();



// // // const { PrismaClient } = require("@prisma/client");
// // // const prisma = new PrismaClient();

// // // async function seedCustomerServiceAgents() {
// // //   const fakeAgents = [
// // //     {
// // //       companyName: "TechNova Solutions",
// // //       establishmentDate: new Date("2015-03-14"),
// // //       companyOwnerName: "Arjun Mehta",
// // //       companyHumanServiceNumber: "+91-9876543210",
// // //       companyDescription: "We provide innovative SaaS tools for businesses worldwide.",
// // //       agentId: "AGT-001",
// // //       agentName: "NovaBot",
// // //       availableTokens: 1_000_000,
// // //       items: [
// // //         {
// // //           itemName: "SmartCRM",
// // //           itemCode: "CRM-101",
// // //           itemInitialWorkingExplanation: "A cloud-based CRM tool for sales teams.",
// // //           itemRunningSteps: ["Login", "Upload client list", "Start campaign"],
// // //           commonProblemsSolutions: [
// // //             { problem: "Login failure", solution: "Reset password via email." },
// // //             { problem: "Data sync delay", solution: "Check internet connection." }
// // //           ]
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       companyName: "GreenTech Farms",
// // //       establishmentDate: new Date("2018-06-21"),
// // //       companyOwnerName: "Neha Sharma",
// // //       companyHumanServiceNumber: "+91-9988776655",
// // //       companyDescription: "Hydroponic farming solutions for urban areas.",
// // //       agentId: "AGT-002",
// // //       agentName: "GreenBot",
// // //       availableTokens: 1_000_000,
// // //       items: [
// // //         {
// // //           itemName: "HydroGrow Kit",
// // //           itemCode: "HG-500",
// // //           itemInitialWorkingExplanation: "Indoor farming kit with automated irrigation.",
// // //           itemRunningSteps: ["Assemble kit", "Add seeds", "Switch on irrigation system"],
// // //           commonProblemsSolutions: [
// // //             { problem: "Pump not working", solution: "Check power supply." },
// // //             { problem: "Plants not growing", solution: "Check pH level of water." }
// // //           ]
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       companyName: "MediQuick Diagnostics",
// // //       establishmentDate: new Date("2020-01-10"),
// // //       companyOwnerName: "Ravi Kapoor",
// // //       companyHumanServiceNumber: "+91-9123456780",
// // //       companyDescription: "Portable medical diagnostic devices for rural areas.",
// // //       agentId: "AGT-003",
// // //       agentName: "MediBot",
// // //       availableTokens: 1_000_000,
// // //       items: [
// // //         {
// // //           itemName: "HealthScan Pro",
// // //           itemCode: "HSP-200",
// // //           itemInitialWorkingExplanation: "Portable device for blood and sugar tests.",
// // //           itemRunningSteps: ["Power on device", "Insert sample", "Read result"],
// // //           commonProblemsSolutions: [
// // //             { problem: "No reading", solution: "Replace test strip." },
// // //             { problem: "Device not starting", solution: "Charge battery fully." }
// // //           ]
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       companyName: "EduSpark Learning",
// // //       establishmentDate: new Date("2017-09-05"),
// // //       companyOwnerName: "Pooja Verma",
// // //       companyHumanServiceNumber: "+91-9112233445",
// // //       companyDescription: "EdTech platform offering personalized online courses.",
// // //       agentId: "AGT-004",
// // //       agentName: "EduBot",
// // //       availableTokens: 1_000_000,
// // //       items: [
// // //         {
// // //           itemName: "SmartTutor",
// // //           itemCode: "ST-150",
// // //           itemInitialWorkingExplanation: "AI-powered personalized learning assistant.",
// // //           itemRunningSteps: ["Login", "Select course", "Begin learning"],
// // //           commonProblemsSolutions: [
// // //             { problem: "Course not loading", solution: "Refresh page or clear cache." },
// // //             { problem: "Progress not saving", solution: "Check account login status." }
// // //           ]
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       companyName: "AutoAssist Robotics",
// // //       establishmentDate: new Date("2019-11-11"),
// // //       companyOwnerName: "Karan Singh",
// // //       companyHumanServiceNumber: "+91-9001122334",
// // //       companyDescription: "Robotic process automation for warehouses.",
// // //       agentId: "AGT-005",
// // //       agentName: "RoboAssist",
// // //       availableTokens: 1_000_000,
// // //       items: [
// // //         {
// // //           itemName: "AutoPick Bot",
// // //           itemCode: "APB-300",
// // //           itemInitialWorkingExplanation: "Automates product picking in warehouses.",
// // //           itemRunningSteps: ["Start bot", "Load task list", "Monitor progress"],
// // //           commonProblemsSolutions: [
// // //             { problem: "Bot stuck", solution: "Clear path manually." },
// // //             { problem: "Battery low", solution: "Recharge bot for 2 hours." }
// // //           ]
// // //         }
// // //       ]
// // //     }
// // //   ];

// // //   await prisma.customerServiceAgents.createMany({
// // //     data: fakeAgents
// // //   });

// // //   console.log("✅ 5 fake CustomerServiceAgents added with 1,000,000 tokens each.");
// // // }

// // // seedCustomerServiceAgents()
// // //   .catch(console.error)
// // //   .finally(() => prisma.$disconnect());


// // // const checkAgentTokens = require("./utils/check_agent_tokens");

// // // (async () => {
// // //   const tokens = await checkAgentTokens("AGT-001");
// // //   console.log("Available Tokens:", tokens);
// // // })();


// // // const removeAgentTokens = require("./utils/remove_agent_tokens");

// // // (async () => {
// // //   const updatedTokens = await removeAgentTokens("AGT-001", 250);
// // //   console.log("Updated Tokens:", updatedTokens);
// // // })();

// // // const getAllAgentDetails = require("./utils/get_all_agent_details");

// // // (async () => {
// // //   const details = await getAllAgentDetails("AGT-001", "NovaBot");
// // //   console.log("Agent Details:", details);
// // // })();


// // // test.js
// // // const { PrismaClient } = require('@prisma/client');
// // // const prisma = new PrismaClient();

// // // async function main() {
// // //   // Fake data for CustomerServiceAgents
// // //   const agentsData = [
// // //     {
// // //       companyName: "TechWave Solutions",
// // //       establishmentDate: new Date("2015-04-12"),
// // //       companyOwnerName: "Ravi Kumar",
// // //       companyHumanServiceNumber: "+91-9876543210",
// // //       companyDescription: "Provides AI-driven customer support for e-commerce businesses.",
// // //       agentId: "AGT001",
// // //       agentName: "SupportBot Alpha",
// // //       username: "techwave_ravi",
// // //       availableTokens: 1000000,
// // //       items: [
// // //         {
// // //           itemName: "Order Tracker",
// // //           itemCode: "OT-101",
// // //           itemInitialWorkingExplanation: "Tracks orders in real-time using shipment APIs.",
// // //           itemRunningSteps: ["Login", "Enter order ID", "Fetch tracking details"],
// // //           commonProblemsSolutions: [
// // //             { problem: "Order ID not found", solution: "Check if order ID is correct" },
// // //             { problem: "Delayed updates", solution: "Refresh every 30 mins" }
// // //           ]
// // //         },
// // //         {
// // //           itemName: "Refund Processor",
// // //           itemCode: "RP-202",
// // //           itemInitialWorkingExplanation: "Automates refund requests for customers.",
// // //           itemRunningSteps: ["Login", "Select refund request", "Approve/Reject"],
// // //           commonProblemsSolutions: [
// // //             { problem: "Invalid bank details", solution: "Ask user to re-enter details" }
// // //           ]
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       companyName: "MediCare Assist",
// // //       establishmentDate: new Date("2018-09-22"),
// // //       companyOwnerName: "Priya Sharma",
// // //       companyHumanServiceNumber: "+91-9988776655",
// // //       companyDescription: "AI assistant for hospital and clinic patient management.",
// // //       agentId: "AGT002",
// // //       agentName: "MediBot",
// // //       username: "medicare_priya",
// // //       availableTokens: 1000000,
// // //       items: [
// // //         {
// // //           itemName: "Appointment Scheduler",
// // //           itemCode: "AS-111",
// // //           itemInitialWorkingExplanation: "Schedules patient appointments with doctors.",
// // //           itemRunningSteps: ["Login", "Select doctor", "Choose date and time", "Confirm"],
// // //           commonProblemsSolutions: [
// // //             { problem: "Doctor not available", solution: "Suggest alternate slots" }
// // //           ]
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       companyName: "EduNext Learning",
// // //       establishmentDate: new Date("2020-02-15"),
// // //       companyOwnerName: "Amit Verma",
// // //       companyHumanServiceNumber: "+91-9090909090",
// // //       companyDescription: "AI-powered educational assistance for schools and colleges.",
// // //       agentId: "AGT003",
// // //       agentName: "EduBot",
// // //       username: "edunext_amit",
// // //       availableTokens: 1000000,
// // //       items: [
// // //         {
// // //           itemName: "Homework Helper",
// // //           itemCode: "HH-301",
// // //           itemInitialWorkingExplanation: "Provides homework guidance and explanations.",
// // //           itemRunningSteps: ["Login", "Upload homework", "Receive solution"],
// // //           commonProblemsSolutions: [
// // //             { problem: "Unclear question", solution: "Ask for more details from user" }
// // //           ]
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       companyName: "FinServe AI",
// // //       establishmentDate: new Date("2017-07-01"),
// // //       companyOwnerName: "Rohit Mehta",
// // //       companyHumanServiceNumber: "+91-9871234567",
// // //       companyDescription: "AI assistant for personal finance and investment tracking.",
// // //       agentId: "AGT004",
// // //       agentName: "FinBot",
// // //       username: "finserve_rohit",
// // //       availableTokens: 1000000,
// // //       items: [
// // //         {
// // //           itemName: "Expense Tracker",
// // //           itemCode: "ET-401",
// // //           itemInitialWorkingExplanation: "Tracks monthly expenses automatically.",
// // //           itemRunningSteps: ["Login", "Connect bank account", "View expense report"],
// // //           commonProblemsSolutions: [
// // //             { problem: "Bank not supported", solution: "Manually upload statements" }
// // //           ]
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       companyName: "TravelEase AI",
// // //       establishmentDate: new Date("2021-12-10"),
// // //       companyOwnerName: "Sneha Gupta",
// // //       companyHumanServiceNumber: "+91-8765432109",
// // //       companyDescription: "AI chatbot for travel planning and booking.",
// // //       agentId: "AGT005",
// // //       agentName: "TravelBot",
// // //       username: "travelease_sneha",
// // //       availableTokens: 1000000,
// // //       items: [
// // //         {
// // //           itemName: "Flight Finder",
// // //           itemCode: "FF-501",
// // //           itemInitialWorkingExplanation: "Finds cheapest and fastest flights.",
// // //           itemRunningSteps: ["Login", "Enter destination", "Select date", "Book"],
// // //           commonProblemsSolutions: [
// // //             { problem: "No flights found", solution: "Change travel date" }
// // //           ]
// // //         }
// // //       ]
// // //     }
// // //   ];

// // //   // Fake data for AgentUsageStatistics
// // //   const usageStatsData = [
// // //     {
// // //       agentId: "AGT001",
// // //       agentName: "SupportBot Alpha",
// // //       usageLogs: [
// // //         { tokensUsed: 1500, timestamp: new Date() },
// // //         { tokensUsed: 2000, timestamp: new Date(Date.now() - 86400000) }
// // //       ]
// // //     },
// // //     {
// // //       agentId: "AGT002",
// // //       agentName: "MediBot",
// // //       usageLogs: [
// // //         { tokensUsed: 1200, timestamp: new Date() },
// // //         { tokensUsed: 1800, timestamp: new Date(Date.now() - 172800000) }
// // //       ]
// // //     },
// // //     {
// // //       agentId: "AGT003",
// // //       agentName: "EduBot",
// // //       usageLogs: [
// // //         { tokensUsed: 1000, timestamp: new Date() },
// // //         { tokensUsed: 2500, timestamp: new Date(Date.now() - 259200000) }
// // //       ]
// // //     },
// // //     {
// // //       agentId: "AGT004",
// // //       agentName: "FinBot",
// // //       usageLogs: [
// // //         { tokensUsed: 3000, timestamp: new Date() },
// // //         { tokensUsed: 2700, timestamp: new Date(Date.now() - 345600000) }
// // //       ]
// // //     },
// // //     {
// // //       agentId: "AGT005",
// // //       agentName: "TravelBot",
// // //       usageLogs: [
// // //         { tokensUsed: 4000, timestamp: new Date() },
// // //         { tokensUsed: 3200, timestamp: new Date(Date.now() - 432000000) }
// // //       ]
// // //     }
// // //   ];

// // //   // Insert fake data into DB
// // //   await prisma.agentUsageStatistics.createMany({ data: usageStatsData });

// // //   console.log("✅ Fake data inserted successfully!");
// // // }

// // // main()
// // //   .catch((e) => {
// // //     console.error(e);
// // //   })
// // //   .finally(async () => {
// // //     await prisma.$disconnect();
// // //   });



// // // fake_usage_stats.js
// // const { PrismaClient } = require('@prisma/client');
// // const prisma = new PrismaClient();

// // function generateUsageLogs(count) {
// //   const logs = [];
// //   const now = Date.now();

// //   for (let i = 0; i < count; i++) {
// //     logs.push({
// //       tokensUsed: Math.floor(Math.random() * 5000) + 500, // 500 to 5500 tokens
// //       // Randomize hours/minutes too for realism
// //       timestamp: new Date(now - i * 86400000 - Math.floor(Math.random() * 86400000))
// //     });
// //   }
// //   return logs;
// // }

// // async function main() {
// //   const usageStatsData = [
// //     {
// //       agentId: "AGT001",
// //       agentName: "SupportBot Alpha",
// //       usageLogs: generateUsageLogs(50)
// //     },
// //     {
// //       agentId: "AGT002",
// //       agentName: "MediBot",
// //       usageLogs: generateUsageLogs(50)
// //     },
// //     {
// //       agentId: "AGT003",
// //       agentName: "EduBot",
// //       usageLogs: generateUsageLogs(50)
// //     },
// //     {
// //       agentId: "AGT004",
// //       agentName: "FinBot",
// //       usageLogs: generateUsageLogs(50)
// //     },
// //     {
// //       agentId: "AGT005",
// //       agentName: "TravelBot",
// //       usageLogs: generateUsageLogs(50)
// //     }
// //   ];

// //   await prisma.agentUsageStatistics.createMany({ data: usageStatsData });
// //   console.log("✅ 50 usage logs per agent inserted into AgentUsageStatistics!");
// // }

// // main()
// //   .catch((e) => console.error(e))
// //   .finally(async () => await prisma.$disconnect());


// // const add_new_tokens_to_agent = require('./utils/add_new_tokens_to_agent');


// // async function wow(){
// // const result = await  add_new_tokens_to_agent("AGT001", "SupportBot Alpha", 503252325);
// // console.log(result);

// // };

// // wow();


// // scripts/add_fake_customer_satisfaction.js

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const handleCustomerSatisfactionData = require("./utils/handle_customer_satisfaction_data");

// const agents = [
//   {
//     agentId: "AGT001",
//     agentName: "SupportBot Alpha",
//     username: "techwave_ravi",
//   },
//   {
//     agentId: "AGT002",
//     agentName: "MediBot",
//     username: "medicare_priya",
//   },
//   {
//     agentId: "AGT003",
//     agentName: "EduBot",
//     username: "edunext_amit",
//   },
//   {
//     agentId: "AGT004",
//     agentName: "FinBot",
//     username: "finserve_rohit",
//   },
//   {
//     agentId: "AGT005",
//     agentName: "TravelBot",
//     username: "travelease_sneha",
//   }
// ];

// async function addFakeData() {
//   const comments = [
//     "Amazing service! Highly recommend.",
//     "Very helpful and quick to respond.",
//     "Good but could be faster.",
//     "Solved my issue instantly.",
//     "Pretty good, no major complaints.",
//     "The bot is friendly and knowledgeable.",
//     "Got exactly what I needed.",
//     "Decent experience overall.",
//     "Could be improved with more examples.",
//     "Perfect experience from start to finish."
//   ];

//   for (const agent of agents) {
//     console.log(`📌 Adding fake reviews for ${agent.agentName}...`);
//     for (let i = 0; i < 10; i++) {
//       const fakeUsername = `${agent.username}_user${i + 1}`;
//       const fakeComment = comments[i];
//       const fakeReviewStar = Math.floor(Math.random() * 3) + 3; // random 3–5 stars

//       await handleCustomerSatisfactionData(
//         fakeUsername,
//         fakeComment,
//         fakeReviewStar,
//         agent.agentId,
//         agent.agentName
//       );
//     }
//     console.log(`✅ Done for ${agent.agentName}`);
//   }

//   console.log("🎯 All fake data added!");
// }

// addFakeData()
//   .catch(err => {
//     console.error(err);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


// const totalRequestsHandledIncrementer = require("./utils/total_requests_handled_incrementer");

// // Agents list from your details
// const agents = [
//   { agentId: "AGT001", agentName: "SupportBot Alpha" },
//   { agentId: "AGT002", agentName: "MediBot" },
//   { agentId: "AGT003", agentName: "EduBot" },
//   { agentId: "AGT004", agentName: "FinBot" },
//   { agentId: "AGT005", agentName: "TravelBot" }
// ];

// // Helper function to delay between inserts (optional, for realism)
// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function addFakeData() {
//   for (const agent of agents) {
//     console.log(`Adding fake request logs for ${agent.agentName}...`);

//     for (let i = 0; i < 10; i++) {
//       // Random delay for realism
//       await delay(100);

//       await totalRequestsHandledIncrementer(agent.agentId, agent.agentName);
//     }

//     console.log(`✅ Added 10 fake logs for ${agent.agentName}`);
//   }

//   console.log("🎯 Fake data insertion complete!");
// }

// addFakeData()
//   .then(() => process.exit(0))
//   .catch(err => {
//     console.error("Error adding fake data:", err);
//     process.exit(1);
//   });


// const validateClientChatHistory = require("./utils/validate_client_chat_history");

// const goodChat = `User: Hi, how are you?
// Lunessa: I’m good, how about you?
// User: I’m fine, thanks!
// Lunessa: welcome ,`;

// console.log(validateClientChatHistory(goodChat));
// // { status: 'passed' }

// const badChat = `User: Hi
// User: Again`;

// console.log(validateClientChatHistory(badChat));
// // { status: 'fail', reason: 'Speakers must alternate, issue at line 2' }


const generateChatTitle = require("./utils/chat_title_generator");
require('dotenv').config();

(async () => {
  const chatHistory = `
User: Hello, I'm having trouble with my smart thermostat. It's not connecting to my Wi-Fi network.
AI Agent: Hello! I can help with that. First, can you tell me the model number of your thermostat?
User: It's a Nest Learning Thermostat, third generation.
AI Agent: Okay, great. Let's try a simple restart. Could you please press and hold the thermostat's display until the screen goes blank and the device reboots?
User: I've done that. It's back on now, but it still says "Wi-Fi not connected."
AI Agent: I see. Let's try to reset the network settings. Go to Settings > Network on the thermostat's display and choose "Reset Wi-Fi." This will erase the old network data.
User: I've reset the network settings. Now it's asking me to select a new network.
AI Agent: Perfect. Now, please select your home Wi-Fi network from the list and enter your password. Make sure you're entering the correct password for your network.
User: It worked! It's connected and online now. Thank you so much for your help!
AI Agent: You're very welcome! Is there anything else I can assist you with today?
`;

  const { title, totalTokens } = await generateChatTitle(
    chatHistory,
    process.env.GEMINI_API_KEY,
    "gemini-2.5-flash"
  );

  console.log("Generated Title:", title);
  console.log("Tokens Used:", totalTokens);
})();

