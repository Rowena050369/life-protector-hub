/* eslint-disable */
import { useState } from "react";

var BRAND = { dark: "#1e3a5f", mid: "#2d6a9f", light: "#e8f0fb" };

var ALL_SOPS = {
  "Mortgage SOP — Full VA Workflow": {
    category: "Mortgage", color: "#1e3a5f", bg: "#e8f0fb",
    sections: [
      { title: "Purpose", content: "This SOP guides the VA through the full mortgage admin process from lead entry to settlement. The VA handles all admin. The Adviser handles all advice and client recommendations." },
      { title: "Step 1 — Lead Entry (Day 1)", content: "1. Receive lead from Facebook, referral, website, or phone.\n2. Log in to Trail CRM → New Contact.\n3. Enter: Full name, DOB, phone, email, lead source, date received.\n4. Tag status as 'New Lead'.\n5. Set follow-up task for next business day.\n6. Send acknowledgement email using approved template.\n7. Notify Adviser of new lead immediately." },
      { title: "Step 2 — Book Discovery Call", content: "1. Call or email the lead within 24 hours.\n2. Introduce yourself as admin support for Rowena at Life Protector Limited.\n3. Offer 2 specific time slots for a 20-minute strategy call.\n4. Book into Adviser's calendar.\n5. Send calendar invite with Zoom/phone details.\n6. Update Trail status to 'Appointment Booked'.\n7. Send 48-hour and 2-hour reminders." },
      { title: "Step 3 — Fact Find Preparation", content: "1. Send fact find form 24 hours before the meeting.\n2. Document checklist to send client:\n   • Photo ID (passport or driver licence)\n   • Last 3 months payslips\n   • Last 3 months bank statements\n   • Latest mortgage statement (if refinancing)\n   • KiwiSaver statement\n3. Pre-populate known fields from Trail.\n4. After meeting: enter all data into Trail.\n5. Upload all documents to client folder in Google Drive.\n6. Update status to 'Fact Find Complete'." },
      { title: "Step 4 — Lender Assessment", content: "1. Adviser selects lender based on client profile.\n2. VA prepares submission package:\n   • Completed fact find\n   • All payslips and bank statements\n   • ID documents\n   • Property details (if known)\n3. Run serviceability calculator if required by Adviser.\n4. Log all documents in Trail." },
      { title: "Step 5 — Application Submission", content: "Pre-application checklist:\n✅ Fact find complete\n✅ All documents collected and filed\n✅ Adviser has confirmed lender and structure\n✅ Client ID verified\n\nSubmission steps:\n1. Log into lender portal (ANZ / ASB / Westpac / BNZ / Kiwibank).\n2. Complete online application using client data.\n3. Attach all supporting documents.\n4. Submit and note reference number.\n5. Log reference number and submission date in Trail.\n6. Update status to 'Application Submitted'.\n7. Set 3-day follow-up task." },
      { title: "Step 6 — Underwriting Follow-Up", content: "1. Check lender portal every 2 business days.\n2. Log all status updates in Trail as notes.\n3. If lender requests more info:\n   • Notify Adviser immediately\n   • Contact client to collect required documents\n   • Submit to lender within 24 hours\n4. Decisions:\n   • Approved → proceed to settlement\n   • Declined → notify Adviser immediately, do NOT tell client without Adviser guidance\n   • Conditional → collect conditions and resubmit" },
      { title: "Step 7 — Settlement & Welcome Pack", content: "1. Receive settlement confirmation from lender.\n2. Verify all details match application.\n3. Prepare Welcome Pack:\n   • Cover letter from Adviser\n   • Loan confirmation letter\n   • Repayment schedule\n   • Lender contact details\n   • Life Protector Limited contact details\n4. Send Welcome Pack to client via email.\n5. Update Trail: status = 'Settled — Active'.\n6. Log commission details.\n7. Set annual review date (12 months from settlement).\n8. Send referral request email to client." },
    ]
  },
  "Document Collection Checklist": {
    category: "Mortgage", color: "#1e3a5f", bg: "#e8f0fb",
    sections: [
      { title: "PAYE Employees", content: "• Government-issued photo ID (passport or NZ driver licence)\n• Last 3 months payslips\n• Last 3 months bank statements (all accounts)\n• Most recent mortgage statement (if refinancing)\n• KiwiSaver statement (latest)\n• Rates notice (if property owner)\n• Any existing loan statements" },
      { title: "Self-Employed Clients", content: "• Government-issued photo ID\n• Last 2 years financial statements (prepared by accountant)\n• Last 2 years IR3 tax returns\n• Last 3 months business bank statements\n• Last 3 months personal bank statements\n• GST returns (last 2 years if GST registered)\n• Accountant's letter confirming income" },
      { title: "Investment Property", content: "• All standard PAYE or self-employed documents above\n• Tenancy agreements for all rental properties\n• Rates notices for all properties\n• Insurance certificates for all properties\n• Body corporate levies (if applicable)\n• Last 3 months rental income statements" },
      { title: "AML/KYC Requirements", content: "Every client must provide:\n1. PRIMARY ID: Passport OR NZ driver licence (must be current)\n2. SECONDARY ID (one of): Bank statement, utility bill, rates notice — must show name and current address, dated within 3 months\n3. For joint applications: both applicants must provide their own ID\n\nRecord in Trail: Date verified, document type, expiry date." },
    ]
  },
  "Lender Submission Guide": {
    category: "Mortgage", color: "#1e3a5f", bg: "#e8f0fb",
    sections: [
      { title: "ANZ", content: "Portal: goLive (ANZ Broker Portal)\nLogin: Your ANZ broker credentials\nSteps:\n1. Log in → New Application\n2. Select loan type: Home Loan / Investment / Refinance\n3. Complete all sections: Borrower, Income, Assets, Liabilities, Security\n4. Upload documents in the Documents tab\n5. Submit → note the ANZ Application Reference Number\n6. Track status in the goLive dashboard\nSupport: 0800 269 296" },
      { title: "ASB", content: "Portal: ASB Broker Hub\nLogin: Your ASB broker credentials\nSteps:\n1. Log in → Create New Application\n2. Complete borrower profile and financial details\n3. Upload all documents\n4. Submit for assessment\n5. Note ASB reference number in Trail\nSupport: 0800 272 555" },
      { title: "Westpac", content: "Portal: Westpac Broker Online\nLogin: Your Westpac broker credentials\nSteps:\n1. Log in → New Home Loan Application\n2. Complete all applicant and loan details\n3. Attach supporting documents\n4. Submit → note reference number\nSupport: 0800 177 277" },
      { title: "BNZ", content: "Portal: BNZ Broker Portal\nLogin: Your BNZ broker credentials\nSteps:\n1. Log in → New Application\n2. Select loan purpose and complete details\n3. Upload documents\n4. Submit and note reference\nSupport: 0800 269 743" },
      { title: "Partners Life (Mortgage Protection)", content: "Portal: Partners Life Adviser Hub\nFor mortgage protection insurance linked to home loans:\n1. Log in → New Application\n2. Select Mortgage Repayment cover\n3. Complete health and financial details\n4. Submit alongside mortgage application\nSupport: 0800 767 267" },
    ]
  },
  "Refix & Refinance Process": {
    category: "Mortgage", color: "#1e3a5f", bg: "#e8f0fb",
    sections: [
      { title: "Refix Process", content: "1. Trail auto-reminder triggers 90 days before fixed rate expiry.\n2. VA sends refix review email to client.\n3. Book 20-minute refix review call with Adviser.\n4. Adviser reviews current rate vs market rates.\n5. VA obtains refix options from current lender.\n6. Adviser recommends refix term.\n7. Client confirms in writing.\n8. VA submits refix instruction to lender.\n9. Confirm new rate and term in writing to client.\n10. Update Trail with new expiry date." },
      { title: "Refinance Process", content: "1. Identify refinance trigger: rate expiry, better deal, equity release, debt consolidation.\n2. Adviser conducts refinance assessment.\n3. VA collects updated documents (payslips, statements — max 3 months old).\n4. VA runs comparison across lenders.\n5. Adviser recommends new lender and structure.\n6. VA submits new application.\n7. On approval: arrange discharge of existing mortgage.\n8. Coordinate settlement with solicitor.\n9. Confirm new loan details with client.\n10. Update Trail — close old record, open new." },
    ]
  },
  "Lead Follow-Up Checklist": {
    category: "Mortgage", color: "#1e3a5f", bg: "#e8f0fb",
    sections: [
      { title: "Follow-Up Schedule", content: "Day 1: Enter lead in Trail. Send acknowledgement email. Set follow-up task.\nDay 2: Phone call attempt #1. If no answer → leave voicemail + send SMS.\nDay 3: Email follow-up if no response.\nDay 5: Phone call attempt #2.\nDay 7: Final follow-up email — 'Just checking in'.\nDay 14: Move to 'Dormant' if no response. Add to reactivation sequence.\n\nAlways log every contact attempt in Trail as a note." },
      { title: "What to Say on the Phone", content: "Opening: 'Hi [Name], this is [VA Name] calling from Life Protector Limited. You enquired about [mortgage/insurance] recently — I'm just calling to see if I can help book a quick chat with our adviser Rowena. Is now a good time?'\n\nIf no answer: 'Hi [Name], this is [VA Name] from Life Protector Limited. We received your enquiry and would love to help. Please call us back on [number] or I'll try again in a couple of days.'\n\nAlways: Be warm, not pushy. Never give advice. Always offer to book a call with Rowena." },
    ]
  },
  "Insurance SOP — Full VA Workflow": {
    category: "Insurance", color: "#155724", bg: "#d4edda",
    sections: [
      { title: "Purpose", content: "This SOP covers the full insurance admin process from lead to policy issuance. The VA handles all admin tasks. The Adviser handles all advice, recommendations, and client conversations about cover." },
      { title: "Step 1 — Lead & Discovery", content: "1. Log lead in Trail within 24 hours.\n2. Send acknowledgement email.\n3. Book 30-minute insurance needs assessment with Adviser.\n4. Send appointment confirmation and reminder.\n5. Prepare pre-meeting brief for Adviser:\n   • Client name, age, occupation\n   • Any existing cover on file\n   • Stated needs from enquiry form" },
      { title: "Step 2 — Fact Find", content: "Send fact find form 24 hours before meeting. Collect:\n• Full name, DOB, occupation, employer\n• Smoker / non-smoker status\n• Annual income\n• Existing insurance policies (insurer, type, sum insured, premium)\n• Health history (as directed by Adviser)\n• Family details (spouse, children, ages)\n• Mortgage and debt details\n• Budget for cover\n\nAfter meeting: Enter all data in Trail. Upload fact find to Google Drive client folder." },
      { title: "Step 3 — Run Quotes", content: "Run quotes on all three insurers using same parameters:\n\nAIA NZ Portal:\n1. Log in → New Quote\n2. Enter DOB, gender, smoker status, occupation\n3. Select cover types as per Adviser instructions\n4. Enter sum insured amounts\n5. Generate quote PDF → save as: [LastName]_AIA_[CoverType]_[Date].pdf\n\nPartners Life Adviser Hub:\n1. Log in → New Quote\n2. Enter same parameters\n3. Check multi-benefit discount eligibility\n4. Generate PDF → save with same naming format\n\nChubb Life Portal:\n1. Log in → New Quote\n2. Enter parameters\n3. Note guaranteed vs agreed value options\n4. Generate PDF\n\nUpload all quote PDFs to Google Drive client folder." },
      { title: "Step 4 — Quote Comparison Document", content: "Prepare side-by-side comparison table including:\n• Monthly premium\n• Annual premium\n• Sum insured\n• Policy type (stepped/level)\n• Cover expiry age\n• Key inclusions\n• Key exclusions/loadings\n• Waiting period\n• Financial strength rating\n\nAdd plain-language summary of key differences.\nDo NOT make a recommendation — that is the Adviser's role.\nSend to Adviser for review.\nUpdate Trail status to 'Quotes Prepared — Awaiting Adviser Review'." },
      { title: "Step 5 — Draft SOA", content: "Populate the SOA template with:\n• Section 1: Client details from Trail\n• Section 2: Scope of advice (confirmed by Adviser)\n• Section 3: Client goals from fact find notes\n• Section 4: Current situation — existing cover details\n• Section 5: Personal reasoning — draft from Adviser's post-meeting notes\n• Section 6: Recommended products — from Adviser's recommendation\n• Section 7: Fees and disclosure — use standard template\n• Section 8: Client acknowledgement signature block\n\nSend draft SOA to Adviser for review.\nNEVER send SOA to client without Adviser sign-off.\nUpdate Trail: 'SOA Draft Sent to Adviser'." },
      { title: "Step 6 — Application Submission", content: "Pre-application checklist:\n✅ SOA signed by client\n✅ Fact find complete\n✅ ID verified (AML/KYC)\n✅ Disclosure Statement sent\n✅ Adviser has confirmed go-ahead\n\nAIA: Log in → New Application → complete all fields → attach docs → submit → note reference number\nPartners Life: Log in → New Application → complete wizard → submit → note reference\nChubb: Log in → New Application → complete form → submit → note reference\n\nLog all reference numbers in Trail.\nUpdate status: 'Application Submitted — Under Underwriting'.\nSet 3-day follow-up task." },
      { title: "Step 7 — Underwriting Follow-Up", content: "Check each insurer portal every 2 business days.\n\nIf insurer requests additional info:\n1. Notify Adviser immediately\n2. Contact client if directed by Adviser\n3. Collect required documents (GP reports, blood tests, financials)\n4. Submit to insurer within 24 hours\n5. Log all actions in Trail\n\nDecision outcomes:\n• Standard accepted → proceed to policy issuance\n• Accepted with loading → Adviser advises client → client confirms → proceed\n• Accepted with exclusion → Adviser advises client → client confirms → proceed\n• Declined → notify Adviser IMMEDIATELY. Do NOT contact client without Adviser guidance." },
      { title: "Step 8 — Policy Issuance", content: "1. Download policy schedule from insurer portal.\n2. Verify all details match application (name, DOB, cover, premium, exclusions).\n3. If discrepancy found → contact insurer immediately → notify Adviser.\n\nPrepare Welcome Pack:\n• Cover letter from Adviser\n• Policy schedule PDF\n• Policy wording document\n• Claims contact information\n• Life Protector Limited contact details\n• Next annual review date\n\nSend Welcome Pack to client via email.\n\nUpdate Trail:\n• Status: 'Policy Issued — Active'\n• Policy number, insurer, cover type, premium, start date\n• Set annual review date (12 months from start)\n• Log commission details\n\nUpload all policy documents to Google Drive." },
    ]
  },
  "Quote Comparison Process": {
    category: "Insurance", color: "#155724", bg: "#d4edda",
    sections: [
      { title: "Quote Parameters", content: "Always use identical parameters across all three insurers:\n• Date of birth (exact)\n• Gender\n• Smoker / non-smoker status\n• Occupation and occupation class\n• Cover type (Life / Trauma / TPD / Income Protection)\n• Sum insured amount\n• Policy structure (stepped / level)\n• Any specific options requested by Adviser" },
      { title: "AIA Quote Steps", content: "1. Log into AIA Adviser Portal\n2. New Quote → Personal\n3. Enter client DOB, gender, smoker status\n4. Select occupation class (check AIA occupation guide)\n5. Add cover types one by one:\n   • Life Cover: enter sum insured\n   • Trauma: enter sum insured, select comprehensive or basic\n   • TPD: enter sum insured, select own/any occupation\n   • Income Protection: enter monthly benefit, waiting period, benefit period\n6. Check AIA Vitality eligibility (active lifestyle clients)\n7. Generate quote → download PDF\n8. Save as: [LastName]_AIA_[Date].pdf" },
      { title: "Partners Life Quote Steps", content: "1. Log into Partners Life Adviser Hub\n2. New Quote → Individual\n3. Enter client details\n4. Add cover types — Partners Life allows multi-benefit bundling\n5. Check multi-benefit discount (usually 10% if 3+ covers)\n6. Review trauma definition — Partners Life covers more conditions than competitors\n7. Generate quote → download PDF\n8. Save as: [LastName]_PL_[Date].pdf" },
      { title: "Chubb Life Quote Steps", content: "1. Log into Chubb Life Adviser Portal\n2. New Quote\n3. Enter client details\n4. Note: Chubb offers guaranteed acceptance options for some products\n5. Compare agreed value vs indemnity for income protection\n6. Generate quote → download PDF\n7. Save as: [LastName]_Chubb_[Date].pdf" },
      { title: "Comparison Table Fields", content: "Build the comparison table with these rows for each insurer:\n\n| Field | AIA | Partners Life | Chubb |\n|---|---|---|---|\n| Monthly Premium | | | |\n| Annual Premium | | | |\n| Sum Insured | | | |\n| Policy Type | | | |\n| Cover Expiry Age | | | |\n| Trauma Conditions | | | |\n| TPD Definition | | | |\n| Waiting Period | | | |\n| Financial Strength | | | |\n| Key Feature | | | |\n\nAdd 3-5 dot points summarising key differences in plain English.\nDo NOT recommend — just highlight differences." },
    ]
  },
  "SOA Drafting Guide": {
    category: "Insurance", color: "#155724", bg: "#d4edda",
    sections: [
      { title: "Purpose & Rules", content: "The Statement of Advice (SOA) is a legally required document under FMCA. The VA drafts it — the Adviser MUST review and sign off before it goes to the client.\n\nNEVER send an SOA to a client without Adviser approval.\nNEVER make a recommendation in the SOA without Adviser direction.\nAlways use the approved Life Protector Limited SOA template." },
      { title: "Section 1 — Client Details", content: "Populate from Trail CRM:\n• Full legal name(s)\n• Date of birth\n• Occupation and employer\n• Annual income\n• Home address\n• Email and phone\n• Dependants (names, ages, relationship)\n• Total household income\n• Total liabilities\n• KiwiSaver balance\n• Monthly budget for cover" },
      { title: "Section 3 — Goals & Objectives", content: "Summarise from Adviser's post-meeting notes. Example format:\n\n'Based on our meeting on [date], [Client] has expressed the following goals:\n1. To ensure the family mortgage of $[X] is covered in the event of death or serious illness.\n2. To maintain the family's current lifestyle of $[X]/month if unable to work.\n3. To protect [Partner] and the children in the event of a critical diagnosis.'\n\nAlso note:\n• Recent life events (new home, new baby, new job)\n• Risk attitude (conservative / moderate / growth)\n• Budget priority" },
      { title: "Section 5 — Personal Reasoning (Most Important)", content: "This section justifies WHY the recommended product suits this specific client. Draft from Adviser's notes.\n\nTemplate:\n'Based on [Client]'s current situation — [age, occupation, income, dependants, mortgage] — and stated goals, we assessed solutions from AIA, Partners Life, and Chubb Life.\n\nWe recommend [Insurer] [Product] because:\n\n1. AFFORDABILITY: Premium of $[X]/month fits within stated budget of $[X]/month.\n\n2. COVER SUITABILITY: [Specific benefit] directly addresses [specific need].\n\n3. PRODUCT FEATURES: [Specific feature relevant to this client, e.g. AIA Vitality for active lifestyle, Partners Life broader trauma definitions, Chubb guaranteed acceptance].\n\n4. DEFINITIONS: [Insurer]'s definition of [TPD/Trauma] is more favourable for [occupation] because [reason].\n\n5. FINANCIAL STRENGTH: [Insurer] holds an [A/AA] rating.\n\nAlternatives considered:\n[Insurer B] — strength noted but [specific limitation] made it less suitable.\n[Insurer C] — reviewed but [specific reason] not recommended.'" },
      { title: "Section 6 — Recommended Products", content: "Populate from Adviser's recommendation:\n\nFor each product include:\n• Insurer name\n• Product name\n• Cover type\n• Sum insured\n• Monthly premium\n• Premium type (stepped/level)\n• Key features\n• Any exclusions or loadings\n\nFinish with a Premium Summary Table:\n| Cover | Insurer | Sum Insured | Monthly Premium |\n|---|---|---|---|\n| Life | | | |\n| Trauma | | | |\n| TPD | | | |\n| Income Protection | | | |\n| TOTAL | | | $[X] |" },
    ]
  },
  "Policy Replacement Process": {
    category: "Insurance", color: "#155724", bg: "#d4edda",
    sections: [
      { title: "What is Replacement?", content: "A policy replacement occurs when an existing insurance policy is cancelled, reduced, or lapsed in connection with purchasing a new policy.\n\nReplacement business requires ADDITIONAL documentation and disclosure under NZ regulations.\n\nThe VA must flag to the Adviser whenever:\n• A client has existing insurance with any insurer\n• The new recommendation results in cancelling existing cover\n• A client wants to switch insurers" },
      { title: "Additional Documents Required", content: "In addition to the standard SOA, replacement cases need:\n\n1. EXISTING POLICY DETAILS TABLE:\n   • Insurer, policy number, cover type\n   • Sum insured, current premium\n   • Commencement date\n   • Existing exclusions/loadings\n   • Guaranteed insurability options remaining\n\n2. REASON FOR REPLACEMENT STATEMENT:\n   Draft from Adviser's instructions. Must include:\n   • Why existing cover is being replaced\n   • Specific improvements in new policy\n   • Premium comparison\n   • Any risks of replacement\n\n3. OLD vs NEW COMPARISON TABLE:\n   Side-by-side of every feature\n\n4. CLIENT REPLACEMENT ACKNOWLEDGEMENT FORM:\n   Client signs to confirm they understand replacement risks." },
      { title: "Replacement Risks to Disclose", content: "Always disclose these risks to the client (Adviser advises, VA documents):\n\n• A new stand-down/waiting period may apply under the new policy\n• Pre-existing conditions accepted under old policy may be re-assessed\n• Client will lose any loyalty benefits of existing policy\n• There may be a gap in cover between cancellation and new policy acceptance\n• Stepped premiums on old policy may be lower short-term than new policy\n\nClient must sign Replacement Acknowledgement Form before application is submitted." },
      { title: "Cancellation of Old Policy", content: "IMPORTANT: Only cancel the existing policy AFTER the new policy has been accepted and issued by the new insurer.\n\nCancellation steps:\n1. Confirm new policy is active (have the policy schedule in hand)\n2. Obtain written instruction from client to cancel old policy\n3. Contact existing insurer to process cancellation\n4. Get cancellation confirmation in writing\n5. Upload confirmation to Google Drive client folder\n6. Log all steps and dates in Trail\n7. Note: some insurers require a cancellation form — check insurer requirements" },
    ]
  },
  "Underwriting Follow-Up SOP": {
    category: "Insurance", color: "#155724", bg: "#d4edda",
    sections: [
      { title: "Tracking Schedule", content: "Check each insurer portal every 2 business days for all open applications.\n\nLog every status update in Trail as a note:\n'[Date] — [Insurer] application [Reference] — Status: [status]. [Action taken if any].'\n\nMaintain an open applications tracker in Google Drive:\n• Client name\n• Insurer\n• Reference number\n• Submitted date\n• Last checked date\n• Current status\n• Outstanding items" },
      { title: "Decision Outcomes", content: "STANDARD ACCEPTANCE:\n→ Proceed to policy issuance (see Policy Issuance SOP)\n\nACCEPTED WITH LOADING:\n→ Notify Adviser → Adviser advises client of loading and reason → Client confirms acceptance in writing → VA logs confirmation → Proceed to issuance\n\nACCEPTED WITH EXCLUSION:\n→ Notify Adviser → Adviser advises client → Client signs exclusion acknowledgement → Proceed to issuance\n\nPOSTPONED:\n→ Notify Adviser → Log postponement reason and review date in Trail → Set calendar reminder for review date\n\nDECLINED:\n→ Notify Adviser IMMEDIATELY → Do NOT contact client or share decline reason without Adviser guidance → Adviser manages client conversation → VA logs outcome in Trail" },
      { title: "Medical Requirements", content: "If insurer requests medical information:\n1. Notify Adviser immediately — Adviser decides how to handle\n2. If directed: contact client to explain what is required\n3. Common requirements:\n   • GP report (client signs medical authority form first)\n   • Blood test (insurer arranges or client visits GP)\n   • Specialist report\n   • Financial statements (for large sum insured)\n4. Chase outstanding items every 5 business days\n5. Log all chase attempts in Trail\n6. Escalate to Adviser if outstanding > 21 days" },
    ]
  },
  "Policy Issuance & Welcome Pack": {
    category: "Insurance", color: "#155724", bg: "#d4edda",
    sections: [
      { title: "Policy Confirmation Steps", content: "1. Receive policy confirmation from insurer portal\n2. Download policy schedule PDF\n3. VERIFY all details match the application:\n   ✅ Client name (full legal name)\n   ✅ Date of birth\n   ✅ Cover type and sum insured\n   ✅ Monthly premium\n   ✅ Any exclusions or loadings\n   ✅ Policy start date\n4. If ANY discrepancy → contact insurer immediately → notify Adviser\n5. Do not send Welcome Pack until all details verified" },
      { title: "Welcome Pack Contents", content: "Prepare Welcome Pack:\n1. Cover letter from Adviser (use approved template)\n   • Congratulate client on their new cover\n   • Briefly explain what they're covered for\n   • Explain how to make a claim\n   • Confirm annual review date\n\n2. Policy schedule PDF (downloaded from insurer)\n\n3. Policy wording document (download from insurer portal)\n\n4. Claims contact information:\n   • AIA: 0800 500 108\n   • Partners Life: 0800 767 267\n   • Chubb: 09 377 1459\n\n5. Life Protector Limited contact card:\n   • Rowena Sabdao — [phone] — rowena@lifeprotectorlimited.com\n\n6. Next annual review date (12 months from start)" },
      { title: "Trail CRM Update", content: "Update client record in Trail:\n• Status: 'Policy Issued — Active'\n• Insurer: [name]\n• Policy number: [number]\n• Cover type: [Life/Trauma/TPD/IP]\n• Sum insured: $[amount]\n• Monthly premium: $[amount]\n• Policy start date: [date]\n• Annual review date: [date — 12 months from start]\n• Upload policy schedule to Trail Documents\n• Log: '[Date] — Policy issued by [Insurer]. Welcome pack sent. Review date set [date].' " },
    ]
  },
  "KiwiSaver Transfer Process": {
    category: "KiwiSaver", color: "#856404", bg: "#fff3cd",
    sections: [
      { title: "When to Transfer", content: "A KiwiSaver transfer is recommended when:\n• Client is in inappropriate fund type for their age/risk profile\n• Client's current provider has poor performance history\n• Client wants features not available with current provider\n• Client is approaching first home withdrawal and needs correct fund\n\nAlways: Adviser makes recommendation. VA handles paperwork." },
      { title: "Risk Profile Assessment", content: "Adviser completes risk profile questionnaire with client. Questions cover:\n• Time until retirement (or first home purchase)\n• Risk tolerance (how would you feel if balance dropped 20%?)\n• Investment knowledge\n• Other savings and investments\n\nFund types:\n• Conservative: 10+ years to withdrawal — NOT recommended for long-term\n• Balanced: general all-purpose\n• Growth: 10+ years, higher risk tolerance\n• Aggressive: 15+ years, high risk tolerance\n\nLog risk profile result in Trail." },
      { title: "Transfer Paperwork Steps", content: "1. Obtain client's current KiwiSaver provider and member number\n2. Complete PIR (Prescribed Investor Rate) form:\n   • Check client's correct PIR rate: 10.5%, 17.5%, or 28%\n   • Client must sign PIR declaration\n3. Complete transfer/joining form for new provider:\n   • Client full name, IRD number, DOB, address\n   • Elected fund type\n   • Contribution rate\n   • Client signature required\n4. Submit to new provider (online portal or email)\n5. New provider contacts IRD to arrange transfer\n6. Transfer takes approximately 10-15 business days\n7. Confirm transfer completion with client\n8. Update Trail with new provider and fund details\n9. Log commission received" },
      { title: "First Home Withdrawal", content: "If client is using KiwiSaver for first home purchase:\n1. Confirm client meets eligibility:\n   • Member for at least 3 years\n   • First home buyer (or previous homeowner who meets criteria)\n   • Purchasing property to live in (not investment)\n2. Client contacts KiwiSaver provider directly for withdrawal\n3. VA assists with paperwork as directed by Adviser\n4. Note: First Home Grant is separate — administered by Kāinga Ora\n5. Grant amount: up to $5,000 per person for existing homes, $10,000 for new builds\n6. Direct client to: kaingaora.govt.nz for grant application" },
    ]
  },
  "Personal Loan Process — Avanti": {
    category: "Personal & Business", color: "#0c5460", bg: "#d1ecf1",
    sections: [
      { title: "Avanti Finance Overview", content: "Avanti Finance is Life Protector Limited's primary personal loan lender.\nLoan amounts: $2,000 – $50,000\nLoan terms: 1 – 7 years\nPurpose: Debt consolidation, vehicle purchase, home improvement, personal\nAdviser submits on behalf of client via Avanti broker portal." },
      { title: "Document Collection", content: "Collect from client:\n• Government-issued photo ID\n• Last 3 months payslips\n• Last 3 months bank statements\n• Details of all existing debts (balances, repayments)\n• Purpose of loan\n• Desired loan amount and term\n\nFor self-employed:\n• Last 2 years financial statements\n• Last 2 years tax returns\n• 3 months business bank statements" },
      { title: "Affordability Assessment", content: "Before submitting, calculate:\n1. Net monthly income (after tax)\n2. Total existing monthly debt repayments\n3. Estimated new loan repayment (use Avanti repayment calculator)\n4. Living expenses (use HEM — Household Expenditure Measure)\n5. Surplus: Income minus all debts minus living expenses\n\nRule: Surplus must be positive after new loan repayment.\nIf not → discuss with Adviser before proceeding." },
      { title: "Avanti Application Steps", content: "1. Log into Avanti Broker Portal\n2. New Application → Personal Loan\n3. Complete client details:\n   • Personal information\n   • Employment and income\n   • Assets and liabilities\n   • Loan amount, purpose, term\n4. Upload documents:\n   • ID\n   • Payslips\n   • Bank statements\n5. Submit application\n6. Note Avanti reference number in Trail\n7. Update status: 'Application Submitted — Avanti'\n8. Avanti typically responds within 24-48 hours\n9. On approval: confirm settlement date and account details with client\n10. Log commission in Trail" },
    ]
  },
  "Lead Gen Daily SOP": {
    category: "Lead Generation", color: "#721c24", bg: "#f8d7da",
    sections: [
      { title: "Morning Routine (8:00 – 9:00am)", content: "8:00am: Check Trail CRM for overnight leads. Enter any new leads immediately.\n\n8:15am: Check Facebook/Instagram:\n• Reply to all comments on posts\n• Reply to all DMs\n• Note any warm leads — enter in Trail\n\n8:30am: Check email inbox:\n• Reply to any client enquiries (do not give advice — just book appointments)\n• Forward anything requiring Adviser attention immediately\n\n8:45am: Check all open Trail tasks due today. Prioritise by urgency." },
      { title: "Lead Follow-Up Block (11:00am – 12:00pm)", content: "Work through the Trail pipeline — 'Warm' leads from last 7 days:\n\n1. Pull list of warm leads not contacted in last 48 hours\n2. Phone call first — use the approved script\n3. If no answer → SMS: 'Hi [Name], this is [VA] from Life Protector Limited. Just following up on your enquiry. Call us on [number] or reply here. Have a great day!'\n4. If SMS no response → email follow-up\n5. Log every attempt in Trail as a note\n6. Book any interested leads into Adviser's calendar\n\nTarget: 10 follow-up calls per day minimum" },
      { title: "Reactivation Block (Monday only)", content: "Every Monday: work through dormant leads list\n\n1. Export from Trail: Last activity > 60 days, status = Lead\n2. Send reactivation email (use approved template)\n3. Top 10 dormant leads — phone call attempt\n4. Log all activity in Trail\n5. Move unresponsive leads (> 6 months no contact) to 'Archive' in Trail\n\nTarget: 20 reactivation emails per week" },
      { title: "End of Day (4:00 – 4:30pm)", content: "4:00pm: Update all Trail records touched today\n4:10pm: Set all follow-up tasks for tomorrow\n4:20pm: Send daily summary to Adviser:\n   • Leads received today: [number]\n   • Appointments booked: [number]\n   • Follow-up calls made: [number]\n   • Issues to flag: [list]\n4:30pm: Queue tomorrow's appointment reminders\n\nWeekly Friday report — add:\n   • Total leads this week\n   • Total appointments booked\n   • Total applications submitted\n   • Revenue settled this week" },
    ]
  },
  "Facebook Ads Management SOP": {
    category: "Lead Generation", color: "#721c24", bg: "#f8d7da",
    sections: [
      { title: "Ad Account Access", content: "Platform: Meta Business Suite (business.facebook.com)\nLogin: Life Protector Limited business account\nAd account: Life Protector Limited\n\nOnly the VA and Adviser have access. Never share login credentials.\nAll ad spend must be approved by Adviser before launching." },
      { title: "Campaign Structure", content: "Campaign → Ad Set → Ad\n\nActive campaigns:\n1. First Home Buyer Campaign — Auckland\n2. Insurance Review Campaign — Filipino Community\n3. Mortgage Review / Refix Campaign\n4. KiwiSaver Review Campaign\n\nBudget: As approved by Adviser (typically $10-20/day per campaign)\nObjective: Lead Generation (Lead Form ads)" },
      { title: "Weekly Ad Checks", content: "Every Monday and Thursday:\n1. Log into Meta Business Suite\n2. Check each campaign:\n   • Cost per lead (target: under $15)\n   • Number of leads this week\n   • Ad frequency (if > 3, refresh creative)\n   • Click-through rate (target: > 2%)\n3. Download new leads from Lead Centre\n4. Enter all new leads into Trail immediately\n5. Report to Adviser: leads, cost per lead, any issues\n\nIf cost per lead > $25 → notify Adviser immediately — may need to pause or adjust" },
      { title: "Responding to Comments", content: "Reply to ALL comments on boosted posts within 4 hours.\n\nFor questions about products/rates:\n'Hi [Name]! Great question — the best way to get an accurate answer for your situation is a quick free chat with our adviser Rowena. I'll DM you to book a time. 😊'\n\nNever answer specific product or rate questions in comments.\nNever quote prices in comments.\nAlways move conversations to DM or phone.\n\nFor negative comments:\nDo not delete (unless abusive). Screenshot and notify Adviser. Respond professionally:\n'Thank you for your feedback [Name]. We take all feedback seriously. Please feel free to contact us directly at [email] so we can assist you properly.'" },
    ]
  },
  "Trail CRM Master Guide": {
    category: "Admin & Operations", color: "#374151", bg: "#f1f5f9",
    sections: [
      { title: "Trail CRM Basics", content: "Trail is the CRM (Client Relationship Management) system for Life Protector Limited.\nAll client data, pipeline management, tasks, notes, and documents are stored here.\n\nLogin: trailapp.com → your assigned login\nNever share your login. Never access Trail on public computers.\n\nKey sections:\n• Contacts: all clients and leads\n• Pipeline: active deals by stage\n• Tasks: to-do items with due dates\n• Notes: all client communication logs\n• Documents: uploaded files\n• Reports: activity and revenue summaries" },
      { title: "Adding a New Contact", content: "1. Contacts → + New Contact\n2. Required fields:\n   • First name, Last name\n   • Mobile (NZ format: 021 XXX XXXX)\n   • Email\n   • Lead source (Facebook / Referral / Website / Phone / Community)\n   • Date added\n3. Optional but important:\n   • Date of birth\n   • Occupation\n   • Employer\n   • Address\n   • Marketing consent (Yes/No)\n4. Check for duplicates before saving — search by name and email first\n5. Save → assign to pipeline stage → set first follow-up task" },
      { title: "Pipeline Stages", content: "Move clients through these stages:\n\n1. New Lead → just entered\n2. Appointment Booked → discovery call scheduled\n3. Fact Find Complete → documents collected\n4. Quote Prepared → quotes run, comparison done\n5. SOA Issued → statement of advice sent to client\n6. Application Submitted → sent to insurer/lender\n7. Under Underwriting → waiting for decision\n8. Approved → decision received\n9. Settled/Issued → loan settled or policy issued\n10. Active Client → ongoing relationship\n11. Dormant → no contact in 90+ days\n12. Not Proceeding → client withdrew\n\nUpdate stage immediately when status changes." },
      { title: "Logging Notes", content: "Every interaction with or about a client must be logged as a Trail note.\n\nNote format:\n[Date] — [What happened] — [Next step]\n\nExamples:\n'15 Jun 2026 — Called client re: outstanding payslips. No answer. Left voicemail. Will retry 17 Jun.'\n\n'15 Jun 2026 — SOA sent via DocuSign. Client has 7 days to sign. Follow up 18 Jun if not signed.'\n\n'15 Jun 2026 — AIA application submitted. Reference: AIA-2026-XXXXX. Follow up 18 Jun for status.'\n\nNever use abbreviations others won't understand.\nAlways log within 24 hours of the activity." },
      { title: "Setting Tasks", content: "Set a Trail task for every follow-up action.\n\nTask fields:\n• Title: clear action (e.g. 'Call client re: outstanding payslips')\n• Due date: specific date\n• Assigned to: correct team member\n• Priority: High / Medium / Low\n• Link to contact: always link to the relevant client\n\nTask rules:\n• Never leave an open lead without a future task\n• Check your task list every morning\n• Complete or reschedule every task — never ignore overdue tasks\n• Escalate tasks you cannot complete to the Adviser" },
    ]
  },
  "Escalation Protocol": {
    category: "Admin & Operations", color: "#374151", bg: "#f1f5f9",
    sections: [
      { title: "When to Escalate Immediately", content: "ESCALATE TO ADVISER IMMEDIATELY if:\n\n• A client asks for specific financial advice, product recommendations, or rate comparisons\n• A client expresses dissatisfaction or makes a complaint\n• An underwriting decision is a decline\n• A client is distressed or upset\n• Any discrepancy is found in a policy or loan document\n• A data breach or privacy concern arises\n• A client mentions legal action or regulator contact\n• Any situation you are unsure how to handle\n\nRule: When in doubt — STOP and ESCALATE. Never guess on compliance matters." },
      { title: "How to Escalate", content: "1. Call Rowena first — do not email for urgent matters\n2. If no answer: WhatsApp message with:\n   • Client name\n   • Issue summary (2-3 sentences)\n   • What action you took (if any)\n   • Whether client is waiting for a response\n3. Log the escalation in Trail:\n   '[Date] — Escalated to Adviser re: [issue]. Awaiting Adviser guidance.'\n4. Do not take any further action on the matter until Adviser responds\n5. Do not tell client 'I'll find out and get back to you' for advice questions — say: 'Rowena will contact you shortly to help with that.'" },
      { title: "Complaint Handling", content: "If a client makes a complaint:\n1. Listen and acknowledge — do NOT argue or defend\n2. Say: 'Thank you for letting us know. I'll make sure Rowena contacts you today to address this personally.'\n3. Immediately notify Rowena by phone\n4. Log in Trail: '[Date] — Client complaint received re: [brief description]. Escalated to Adviser immediately.'\n5. Do not attempt to resolve the complaint yourself\n\nLife Protector Limited complaints process:\n1. Internal complaint to Rowena\n2. If unresolved within 40 working days → client can contact IFSO\n3. IFSO: ifso.nz / 0800 888 202" },
    ]
  },
};

var SOA_CATS_LIST = [
  { name: "Mortgage", color: "#1e3a5f", bg: "#e8f0fb", icon: "🏠", keys: ["Mortgage SOP — Full VA Workflow", "Document Collection Checklist", "Lender Submission Guide", "Refix & Refinance Process", "Lead Follow-Up Checklist"] },
  { name: "Insurance", color: "#155724", bg: "#d4edda", icon: "🛡️", keys: ["Insurance SOP — Full VA Workflow", "Quote Comparison Process", "SOA Drafting Guide", "Policy Replacement Process", "Underwriting Follow-Up SOP", "Policy Issuance & Welcome Pack"] },
  { name: "KiwiSaver", color: "#856404", bg: "#fff3cd", icon: "🐖", keys: ["KiwiSaver Transfer Process"] },
  { name: "Personal & Business", color: "#0c5460", bg: "#d1ecf1", icon: "💳", keys: ["Personal Loan Process — Avanti"] },
  { name: "Lead Generation", color: "#721c24", bg: "#f8d7da", icon: "🎯", keys: ["Lead Gen Daily SOP", "Facebook Ads Management SOP"] },
  { name: "Admin & Operations", color: "#374151", bg: "#f1f5f9", icon: "⚙️", keys: ["Trail CRM Master Guide", "Escalation Protocol"] },
];

var TRAIN_TRACKS = [
  { name: "Adviser — 12 weeks", color: "#1e3a5f", bg: "#e8f0fb", modules: ["Regulatory & Compliance", "Mortgage Product Mastery", "Insurance Product Mastery", "KiwiSaver & Investment", "Personal & Business Loans", "Sales & Advice Process", "Business Development"] },
  { name: "VA — 6 modules", color: "#155724", bg: "#d4edda", modules: ["Admin Fundamentals", "Mortgage Admin", "Insurance Admin", "KiwiSaver, Investment & Loans", "Customer Service Excellence", "Lead Generation Support"] },
  { name: "Lead Gen — 2 weeks", color: "#721c24", bg: "#f8d7da", modules: ["Brand voice & compliance rules", "Trail CRM lead entry", "Facebook Ads & community posting", "Phone scripts & call process", "Email sequences & MailerLite"] },
];

function SOPViewer(props) {
  var sop = ALL_SOPS[props.sopKey];
  var openState = useState(null);
  var open = openState[0]; var setOpen = openState[1];
  if (!sop) return null;
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: sop.color, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={props.onBack} style={{ background: "rgba(255,255,255,.2)", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer" }}>← Back</button>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>{props.sopKey}</div>
      </div>
      <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
        {sop.sections.map(function(sec, i) {
          return (
            <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div onClick={function() { setOpen(open === i ? null : i); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", cursor: "pointer", background: open === i ? sop.bg : "#fff" }}>
                <div style={{ fontWeight: 500, fontSize: 14, color: sop.color }}>{sec.title}</div>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>{open === i ? "▲" : "▼"}</span>
              </div>
              {open === i && (
                <div style={{ borderTop: "1px solid #f1f5f9", padding: "16px 18px" }}>
                  <pre style={{ fontSize: 13, color: "#374151", whiteSpace: "pre-wrap", lineHeight: 1.8, margin: 0, fontFamily: "inherit" }}>{sec.content}</pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SopHub() {
  var sectionState = useState("sops");
  var section = sectionState[0]; var setSection = sectionState[1];
  var openState = useState(null);
  var open = openState[0]; var setOpen = openState[1];
  var activeSopState = useState(null);
  var activeSop = activeSopState[0]; var setActiveSop = activeSopState[1];

  if (activeSop) {
    return React.createElement(SOPViewer, { sopKey: activeSop, onBack: function() { setActiveSop(null); } });
  }

  function navBtn(id, label) {
    return (
      <button key={id} onClick={function() { setSection(id); setOpen(null); }} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: section === id ? "#1e3a5f" : "transparent", color: section === id ? "#fff" : "#64748b" }}>
        {label}
      </button>
    );
  }

  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: "#1e3a5f", padding: "14px 20px" }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>📋 SOP Hub — Life Protector Limited</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 2 }}>Click any SOP to open the full procedure</div>
      </div>
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
          {navBtn("sops", "SOPs")}
          {navBtn("training", "Training")}
          {navBtn("compliance", "Compliance Rules")}
          {navBtn("contacts", "Key Contacts")}
        </div>
      </div>
      <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
        {section === "sops" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 4 }}>Standard Operating Procedures</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>Click any SOP title to open the full step-by-step procedure.</div>
            {SOA_CATS_LIST.map(function(cat, ci) {
              return (
                <div key={ci} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div onClick={function() { setOpen(open === ci ? null : ci); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", cursor: "pointer", background: open === ci ? cat.bg : "#fff" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 20 }}>{cat.icon}</span>
                      <span style={{ fontWeight: 500, fontSize: 14, color: cat.color }}>{cat.name}</span>
                      <span style={{ background: "#f1f5f9", color: "#475569", fontSize: 11, padding: "2px 8px", borderRadius: 10 }}>{cat.keys.length} SOPs</span>
                    </div>
                    <span style={{ color: "#94a3b8", fontSize: 14 }}>{open === ci ? "▲" : "▼"}</span>
                  </div>
                  {open === ci && (
                    <div style={{ borderTop: "1px solid #f1f5f9", padding: "8px 18px" }}>
                      {cat.keys.map(function(key, ki) {
                        var hasContent = !!ALL_SOPS[key];
                        return (
                          <div key={ki} onClick={hasContent ? function() { setActiveSop(key); } : null}
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: ki < cat.keys.length - 1 ? "1px solid #f8fafc" : "none", cursor: hasContent ? "pointer" : "default" }}>
                            <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: hasContent ? cat.color : "#94a3b8" }}>
                              <span>📄</span>
                              <span style={{ fontWeight: hasContent ? 500 : 400, textDecoration: hasContent ? "underline" : "none" }}>{key}</span>
                            </div>
                            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                              <span style={{ background: "#d4edda", color: "#155724", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>Live</span>
                              {hasContent && <span style={{ color: cat.color, fontSize: 12 }}>Open →</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {section === "training" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Training Tracks</div>
            {TRAIN_TRACKS.map(function(track, ti) {
              var key = "t" + ti;
              return (
                <div key={ti} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div onClick={function() { setOpen(open === key ? null : key); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", cursor: "pointer", background: open === key ? track.bg : "#fff" }}>
                    <div style={{ fontWeight: 500, fontSize: 15, color: track.color }}>{track.name}</div>
                    <span style={{ color: "#94a3b8" }}>{open === key ? "▲" : "▼"}</span>
                  </div>
                  {open === key && (
                    <div style={{ borderTop: "1px solid #f1f5f9", padding: "14px 20px" }}>
                      {track.modules.map(function(mod, mi) {
                        return (
                          <div key={mi} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: mi < track.modules.length - 1 ? "1px solid #f8fafc" : "none" }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: track.bg, color: track.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{mi + 1}</div>
                            <span style={{ fontSize: 13, color: "#1e293b" }}>{mod}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {section === "compliance" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Compliance Golden Rules</div>
            <div style={{ background: "#f8d7da", borderRadius: 12, padding: "18px 20px", marginBottom: 16 }}>
              {["Never provide financial advice without a signed SOA in place.", "Never submit an application without a completed compliance checklist.", "AML/KYC must be completed before any advice is given.", "Disclosure Statement must be sent before the first advice conversation.", "All client files must be retained for 7 years minimum.", "Any complaint must be escalated to the Adviser within 24 hours.", "All client communication must be logged in Trail within 24 hours.", "Never share client data externally without Adviser authorisation."].map(function(r, i) {
                return (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: "#721c24", alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0 }}>⚠️</span><span>{r}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {section === "contacts" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Key Contacts</div>
            {[
              ["Regulators", [["Financial Markets Authority", "fma.govt.nz", "0800 366 385"], ["IFSO Ombudsman", "ifso.nz", "0800 888 202"]]],
              ["Insurers", [["AIA NZ Adviser", "aia.co.nz/adviser", "0800 242 238"], ["Partners Life", "partnerslife.co.nz/adviser", "0800 767 267"], ["Chubb Life", "chubb.com/nz", "09 377 1459"]]],
              ["Tools", [["Trail CRM", "trailapp.com", "support@trailapp.com"], ["Kainga Ora", "kaingaora.govt.nz", "0508 935 266"]]],
            ].map(function(group, gi) {
              return (
                <div key={gi} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", marginBottom: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontWeight: 500, fontSize: 13, color: "#1e3a5f", marginBottom: 10 }}>{group[0]}</div>
                  {group[1].map(function(item, i) {
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: i > 0 ? "1px solid #f8fafc" : "none", fontSize: 13 }}>
                        <div>
                          <div style={{ fontWeight: 500, color: "#1e293b" }}>{item[0]}</div>
                          <div style={{ color: "#64748b", fontSize: 12 }}>{item[2]}</div>
                        </div>
                        <span style={{ color: "#1e3a5f", fontSize: 12 }}>{item[1]}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SopHub;