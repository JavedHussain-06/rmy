import { create } from 'zustand';

const useStore = create(() => ({
whatYouWillGet: [
  {
    bg: "bg-gradient-to-r from-[#3398F7] via-[#0E7ADF] to-[#125ECF]",
    heading: `<p>Enjoy 200 Free Toll Transactions on National Highways.</p>`,
    headingStyle: "text-[1.7rem] font-bold text-white",
  },
  {
    heading: `<p>Just ₹3000. No recurring payments.</p><p>No hidden fees.</p>`,
    headingStyle:
      "text-[1.65rem] font-bold bg-gradient-to-r from-[#1264D2] to-[#1264D2] bg-clip-text text-transparent",
  },
  {
    bg: "bg-gradient-to-r from-[#0E7ADF] to-[#125ECF]",
    heading: `<p>Valid for <br/> one year<br/>  from<br/>  issuing.</p>`,
    headingStyle: "text-[2rem] font-inter font-bold text-white",
  },
  {
    heading: `<p>Links to <br/> existing <br/>  FASTag <br/> accounts.  No setup<br/>  needed.</p>`,
    headingStyle:
      "text-[1.58rem] font-bold bg-gradient-to-r from-[#1264D2] to-[#1264D2] bg-clip-text text-transparent",
  },
]

 , hwoItWorks: [
    {
      icons: "/assets/car.svg",
      heading: "Check Eligibility",
      subtext: "Enter Vehicle Registration Number (VRN) to check eligibility for Annual Pass."
    },
    {
      icons: "/assets/rupee.svg",
      heading: "Complete Payment",
      subtext: "Once eligible, pay ₹3000 securely via your preferred payment method"
    },
    {
      icons: "/assets/toll.svg",
      heading: "Enjoy Free Tolls",
      subtext: "Freely pass through 200 National Highway tolls for up to 1 year"
    }
  ],
  
  // ✅ Added FAQs here
  annualPassFAQs: [
    {
      question: "What is the Annual Pass?",
      answer: "The Annual Pass allows 200 toll-free transactions on National Highways for a year."
    },
    {
      question: "Who is eligible for the Annual Pass?",
      answer: "Any user with a valid FASTag-linked vehicle is eligible to purchase the Annual Pass."
    },
    {
      question: "Does the pass cover all tolls?",
      answer: "It covers only National Highway tolls where FASTag is applicable."
    },
    {
      question: "How long is the pass valid?",
      answer: "The pass is valid for 1 year from activation or until 200 uses—whichever comes first."
    },
    {
      question: "Can I renew the pass before it expires?",
      answer: "Yes, you can renew anytime before expiry or when your 200 tolls are used up."
    }
  ]
}));

export default useStore;
