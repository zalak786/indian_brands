import fs from 'fs';
import path from 'path';

// This script compiles a comprehensive list of Indian brands based on researched data.
// In a real-world scenario with unrestricted access, this could connect to a scraping API.
// For now, we populate it with the verified high-quality verified lists we found.

const categories = [
    {
        name: "Electronics & Technology",
        keywords: ["electronics", "mobile", "audio", "software", "it"],
        brands: [
            { name: "boAt", website: "https://www.boat-lifestyle.com", description: "Consumer electronics, audio & wearables." },
            { name: "Micromax", website: "https://micromaxinfo.com", description: "Consumer electronics & mobiles." },
            { name: "Lava", website: "https://www.lavamobiles.com", description: "Mobile handsets & tablets." },
            { name: "Noise", website: "https://www.gonoise.com", description: "Smart wearables & audio." },
            { name: "Fire-Boltt", website: "https://www.fireboltt.com", description: "Smartwatches & audio." },
            { name: "Mivi", website: "https://www.mivi.in", description: "Electronics & audio accessories." },
            { name: "Portronics", website: "https://www.portronics.com", description: "Portable electronics." },
            { name: "Dixon Technologies", website: "https://dixoninfo.com", description: "Electronic manufacturing services." },
            { name: "Havells", website: "https://www.havells.com", description: "Electrical equipment & home appliances." },
            { name: "Bajaj Electricals", website: "https://www.bajajelectricals.com", description: "Consumer electrical equipment." },
            { name: "Voltas", website: "https://www.voltas.com", description: "Air conditioning & cooling technology." },
            { name: "Blue Star", website: "https://www.bluestarindia.com", description: "Air conditioning & commercial refrigeration." },
            { name: "Zebronics", website: "https://zebronics.com", description: "IT peripherals & audio/video products." },
            { name: "Intex", website: "https://www.intex.in", description: "Consumer electronics & accessories." },
            { name: "Zoho", website: "https://www.zoho.com", description: "Software development & cloud computing." },
            { name: "TCS", website: "https://www.tcs.com", description: "IT services & consulting." },
            { name: "Infosys", website: "https://www.infosys.com", description: "IT consulting & services." },
            { name: "Wipro", website: "https://www.wipro.com", description: "IT, consulting & business process services." },
            { name: "HCLTech", website: "https://www.hcltech.com", description: "Global technology company." },
            { name: "Tech Mahindra", website: "https://www.techmahindra.com", description: "IT services & consulting." },
            { name: "9 Software Solutions", website: "https://9softwaresolutions.com", description: "Software development & IT solutions." }
        ]
    },
    {
        name: "Fashion & Textiles",
        keywords: ["clothing", "fashion", "textile", "apparel"],
        brands: [
            { name: "Fabindia", website: "https://www.fabindia.com", description: "Ethnic wear & furnishings." },
            { name: "Biba", website: "https://www.biba.in", description: "Ethnic fashion for women." },
            { name: "Raymond", website: "https://www.raymond.in", description: "Suiting, shirting & apparel." },
            { name: "Peter England", website: "https://www.peterengland.com", description: "Menswear brand." },
            { name: "Allen Solly", website: "https://www.allensolly.com", description: "Work casuals for men & women." },
            { name: "Manyavar", website: "https://www.manyavar.com", description: "Wedding & celebration wear." },
            { name: "Nykaa Fashion", website: "https://www.nykaafashion.com", description: "Multi-brand beauty & fashion retailer." },
            { name: "Hidesign", website: "https://hidesign.com", description: "Premium leather bags & accessories." },
            { name: "W for Woman", website: "https://wforwoman.com", description: "Contemporary women's wear." },
            { name: "Aurelia", website: "https://www.aureliatradition.com", description: "Ethnic wear for women." },
            { name: "Pantaloons", website: "https://www.pantaloons.com", description: "Fashion retailer for men, women & kids." },
            { name: "Killer Jeans", website: "https://www.killerjeans.com", description: "Denim & casual wear." },
            { name: "Monte Carlo", website: "https://www.montecarlo.in", description: "Woolen & cotton apparel." },
            { name: "Welspun", website: "https://www.welspunindia.com", description: "Home textiles (towels, bedsheets)." },
            { name: "Trident Group", website: "https://www.tridentindia.com", description: "Home textiles, paper & chemicals." },
            { name: "Arvind", website: "https://www.arvind.com", description: "Textile manufacturer & retailer." },
            { name: "Sabyasachi", website: "https://www.sabyasachi.com", description: "Luxury fashion & jewelry." },
            { name: "Manish Malhotra", website: "https://manishmalhotra.in", description: "Luxury couture." }
        ]
    },
    {
        name: "FMCG (Food & Goods)",
        keywords: ["food", "beverage", "consumer goods", "personal care"],
        brands: [
            { name: "Amul", website: "https://amul.com", description: "Leading dairy cooperative." },
            { name: "Britannia", website: "http://britannia.co.in", description: "Biscuits, breads & dairy products." },
            { name: "Parle", website: "http://www.parleproducts.com", description: "Biscuits & confectionery." },
            { name: "ITC", website: "https://www.itcportal.com", description: "Diversified conglomerate (Aashirvaad, Sunfeast)." },
            { name: "Dabur", website: "https://www.dabur.com", description: "Ayurvedic & natural health care." },
            { name: "Godrej Consumer", website: "https://www.godrejcp.com", description: "Home & personal care products." },
            { name: "Haldiram's", website: "https://www.haldirams.com", description: "Snacks & sweets." },
            { name: "Tata Consumer", website: "https://www.tataconsumer.com", description: "Tea, clean water & food products." },
            { name: "Marico", website: "https://marico.com", description: "Health, beauty & wellness (Parachute, Saffola)." },
            { name: "Emami", website: "https://www.emamiltd.in", description: "Personal & healthcare products." },
            { name: "Patanjali", website: "https://www.patanjaliayurved.net", description: "Herbal & ayurvedic products." },
            { name: "Bikaji", website: "https://www.bikaji.com", description: "Traditional snacks & sweets." },
            { name: "Paper Boat", website: "https://www.paperboatdrinks.com", description: "Traditional Indian beverages." },
            { name: "Himalaya Wellness", website: "https://himalayawellness.in", description: "Herbal health & personal care." },
            { name: "Varun Beverages", website: "https://varunpepsi.com", description: "Bottling & beverage distribution." }
        ]
    },
    {
        name: "Automotive & Mobility",
        keywords: ["car", "bike", "vehicle", "transport"],
        brands: [
            { name: "Tata Motors", website: "https://www.tatamotors.com", description: "Cars, SUVs, trucks & buses." },
            { name: "Mahindra", website: "https://www.mahindra.com", description: "SUVs, farm equipment & utility vehicles." },
            { name: "Maruti Suzuki", website: "https://www.marutisuzuki.com", description: "Passenger cars." },
            { name: "Bajaj Auto", website: "https://www.bajajauto.com", description: "Motorcycles & three-wheelers." },
            { name: "Royal Enfield", website: "https://www.royalenfield.com", description: "Classic motorcycles." },
            { name: "TVS Motor", website: "https://www.tvsmotor.com", description: "Two-wheelers & three-wheelers." },
            { name: "Hero MotoCorp", website: "https://www.heromotocorp.com", description: "World's largest manufacturer of two-wheelers." },
            { name: "Ola Electric", website: "https://olaelectric.com", description: "Electric scooters." },
            { name: "Ather Energy", website: "https://www.atherenergy.com", description: "Electric scooters." },
            { name: "Ashok Leyland", website: "https://www.ashokleyland.com", description: "Commercial vehicles & buses." },
            { name: "Eicher Motors", website: "https://www.eicher.in", description: "Commercial vehicles & motorcycles." },
            { name: "Force Motors", website: "https://www.forcemotors.com", description: "Vans & commercial vehicles." }
        ]
    },
    {
        name: "Startups & Digital Services",
        keywords: ["startup", "app", "service", "digital"],
        brands: [
            { name: "Flipkart", website: "https://www.flipkart.com", description: "Leading e-commerce marketplace." },
            { name: "Zomato", website: "https://www.zomato.com", description: "Food delivery & restaurant discovery." },
            { name: "Swiggy", website: "https://www.swiggy.com", description: "Food & grocery delivery." },
            { name: "Paytm", website: "https://paytm.com", description: "Digital payments & financial services." },
            { name: "PhonePe", website: "https://www.phonepe.com", description: "UPI payments & financial services." },
            { name: "Razorpay", website: "https://razorpay.com", description: "Payment gateway for businesses." },
            { name: "Zerodha", website: "https://zerodha.com", description: "Stock trading & investment platform." },
            { name: "Groww", website: "https://groww.in", description: "Investment platform." },
            { name: "Lenskart", website: "https://www.lenskart.com", description: "Eyewear retailer." },
            { name: "Ola", website: "https://www.olacabs.com", description: "Ride-hailing platform." },
            { name: "Delhivery", website: "https://www.delhivery.com", description: "Logistics & supply chain." },
            { name: "EaseMyTrip", website: "https://www.easemytrip.com", description: "Travel booking platform." },
            { name: "BookMyShow", website: "https://in.bookmyshow.com", description: "Movie & event ticketing." },
            { name: "Urban Company", website: "https://www.urbancompany.com", description: "Home services marketplace." },
            { name: "BigBasket", website: "https://www.bigbasket.com", description: "Online grocery." },
            { name: "Blinkit", website: "https://blinkit.com", description: "Quick commerce delivery." },
            { name: "Zepto", website: "https://www.zeptonow.com", description: "10-minute grocery delivery." }
        ]
    },
    {
        name: "Manufacturing & Heavy Industry",
        keywords: ["steel", "cement", "infrastructure", "power"],
        brands: [
            { name: "Reliance Industries", website: "https://www.ril.com", description: "Petrochemicals, refining, oil & gas." },
            { name: "Tata Steel", website: "https://www.tatasteel.com", description: "Steel manufacturing." },
            { name: "JSW Steel", website: "https://www.jsw.in", description: "Steel, energy, infrastructure." },
            { name: "Larsen & Toubro (L&T)", website: "https://www.larsentoubro.com", description: "Engineering, construction, manufacturing." },
            { name: "Adani Group", website: "https://www.adani.com", description: "Infrastructure, logistics, energy." },
            { name: "UltraTech Cement", website: "https://www.ultratechcement.com", description: "Largest cement manufacturer." },
            { name: "Hindalco", website: "https://www.hindalco.com", description: "Aluminum & copper manufacturing." },
            { name: "Bharat Forge", website: "https://www.bharatforge.com", description: "Forging & automotive components." },
            { name: "Asian Paints", website: "https://www.asianpaints.com", description: "Paints & coatings." },
            { name: "Pidilite", website: "https://pidilite.com", description: "Adhesives (Fevicol) & industrial chemicals." },
            { name: "SRF", website: "https://www.srf.com", description: "Chemicals & technical textiles." },
            { name: "UPL", website: "https://www.upl-ltd.com", description: "Agrochemicals & industrial chemicals." }
        ]
    },
    {
        name: "Pharmaceuticals & Healthcare",
        keywords: ["medicine", "pharma", "health", "hospital", "biotech"],
        brands: [
            { name: "Sun Pharma", website: "https://sunpharma.com", description: "Specialty generic pharmaceuticals." },
            { name: "Cipla", website: "https://www.cipla.com", description: "Pharmaceuticals & biotechnology." },
            { name: "Dr. Reddy's Laboratories", website: "https://www.drreddys.com", description: "Global pharmaceutical company." },
            { name: "Apollo Hospitals", website: "https://www.apollohospitals.com", description: "Healthcare & hospital chain." },
            { name: "Divi's Laboratories", website: "https://www.divislabs.com", description: "Active pharmaceutical ingredients (APIs)." },
            { name: "Lupin", website: "https://www.lupin.com", description: "Pharmaceuticals & biotechnology." },
            { name: "Zydus Lifesciences", website: "https://zyduslife.com", description: "Healthcare & pharmaceuticals." },
            { name: "Biocon", website: "https://www.biocon.com", description: "Biopharmaceuticals & enzymes." },
            { name: "Glenmark", website: "https://glenmarkpharma.com", description: "Research-led global pharmaceutical company." },
            { name: "Mankind Pharma", website: "https://www.mankindpharma.com", description: "Pharmaceuticals & consumer healthcare." },
            { name: "Fortis Healthcare", website: "https://www.fortishealthcare.com", description: "Chain of hospitals & wellness centers." },
            { name: "Max Healthcare", website: "https://www.maxhealthcare.in", description: "Hospital chain." },
            { name: "Torrent Pharma", website: "https://www.torrentpharma.com", description: "Therapeutic pharmaceutical products." }
        ]
    },
    {
        name: "Banking & Finance",
        keywords: ["bank", "finance", "insurance", "loan", "investment"],
        brands: [
            { name: "HDFC Bank", website: "https://www.hdfcbank.com", description: "Leading private sector bank." },
            { name: "State Bank of India (SBI)", website: "https://sbi.co.in", description: "Largest public sector bank." },
            { name: "ICICI Bank", website: "https://www.icicibank.com", description: "Banking & financial services." },
            { name: "Kotak Mahindra Bank", website: "https://www.kotak.com", description: "Banking & financial services." },
            { name: "Axis Bank", website: "https://www.axisbank.com", description: "Private sector bank." },
            { name: "Bajaj Finance", website: "https://www.bajajfinserv.in", description: "Non-banking financial company." },
            { name: "LIC", website: "https://licindia.in", description: "Largest insurance & investment company." },
            { name: "Punjab National Bank", website: "https://www.pnbindia.in", description: "Public sector bank." },
            { name: "Bank of Baroda", website: "https://www.bankofbaroda.in", description: "Public sector bank." },
            { name: "IndusInd Bank", website: "https://www.indusind.com", description: "New-generation private bank." },
            { name: "HDFC Life", website: "https://www.hdfclife.com", description: "Life insurance provider." },
            { name: "SBI Card", website: "https://www.sbicard.com", description: "Credit card provider." },
            { name: "Muthoot Finance", website: "https://www.muthootfinance.com", description: "Gold loan & financial services." }
        ]
    },
    {
        name: "Real Estate & Infrastructure",
        keywords: ["construction", "homes", "office", "development", "infra"],
        brands: [
            { name: "DLF", website: "https://www.dlf.in", description: "Commercial & residential real estate." },
            { name: "Godrej Properties", website: "https://www.godrejproperties.com", description: "Real estate development." },
            { name: "Oberoi Realty", website: "https://www.oberoirealty.com", description: "Luxury real estate developer." },
            { name: "Lodha (Macrotech)", website: "https://www.lodhagroup.in", description: "Premium residential real estate." },
            { name: "Brigade Group", website: "https://www.brigadegroup.com", description: "Property developer." },
            { name: "Prestige Group", website: "https://www.prestigeconstructions.com", description: "Real estate development." },
            { name: "Tata Housing", website: "https://www.tatahousing.in", description: "Residential property developer." },
            { name: "Sobha", website: "https://www.sobha.com", description: "Real estate developer." },
            { name: "NBCC", website: "https://www.nbccindia.in", description: "Civil engineering & construction." },
            { name: "IRB Infrastructure", website: "https://www.irb.co.in", description: "Highway construction & management." },
            { name: "GMR Group", website: "https://www.gmrgroup.in", description: "Airports & infrastructure." }
        ]
    },
    {
        name: "Hospitality & Tourism",
        keywords: ["hotel", "travel", "resort", "tourism", "vacation"],
        brands: [
            { name: "Taj Hotels (IHCL)", website: "https://www.tajhotels.com", description: "Luxury hotels & resorts." },
            { name: "Oberoi Hotels", website: "https://www.oberoihotels.com", description: "Luxury hospitality group." },
            { name: "ITC Hotels", website: "https://www.itchotels.com", description: "Luxury hotel chain." },
            { name: "Lemon Tree Hotels", website: "https://www.lemontreehotels.com", description: "Mid-scale hotel chain." },
            { name: "The Leela", website: "https://www.theleela.com", description: "Luxury palaces & hotels." },
            { name: "MakeMyTrip", website: "https://www.makemytrip.com", description: "Online travel company." },
            { name: "Yatra", website: "https://www.yatra.com", description: "Travel agency & search engine." },
            { name: "IRCTC", website: "https://www.irctc.co.in", description: "Indian Railways catering & tourism." },
            { name: "Thomas Cook India", website: "https://www.thomascook.in", description: "Travel & foreign exchange." },
            { name: "Club Mahindra", website: "https://www.clubmahindra.com", description: "Vacation ownership & resorts." }
        ]
    },
    {
        name: "Agriculture & Agro-Chemicals",
        keywords: ["farming", "seeds", "fertilizer", "agritech"],
        brands: [
            { name: "Coromandel International", website: "https://www.coromandel.biz", description: "Fertilizers & crop protection." },
            { name: "UPL", website: "https://www.upl-ltd.com", description: "Agrochemicals & industrial chemicals." },
            { name: "Bayer CropScience India", website: "https://www.bayer.in", description: "Crop protection & seeds." },
            { name: "Godrej Agrovet", website: "https://www.godrejagrovet.com", description: "Animal feed & agribusiness." },
            { name: "PI Industries", website: "https://www.piindustries.com", description: "Agri-sciences & chemicals." },
            { name: "Kaveri Seeds", website: "https://www.kaveriseeds.in", description: "Hybrid seeds." },
            { name: "Jain Irrigation", website: "https://www.jains.com", description: "Irrigation systems & food processing." },
            { name: "Rallis India", website: "https://www.rallis.com", description: "Crop care & seeds." },
            { name: "Chambal Fertilisers", website: "https://www.chambalfertilisers.com", description: "Urea & fertilizers." }
        ]
    },
    {
        name: "Media & Entertainment",
        keywords: ["news", "tv", "movies", "cinema", "music"],
        brands: [
            { name: "Zee Entertainment", website: "https://www.zee.com", description: "Media & entertainment conglomerate." },
            { name: "PVR Inox", website: "https://www.pvrcinemas.com", description: "Largest cinema exhibitor." },
            { name: "Sun TV Network", website: "https://www.suntv.in", description: "Television network." },
            { name: "Network18", website: "https://www.nw18.com", description: "Media & entertainment group." },
            { name: "NDTV", website: "https://www.ndtv.com", description: "News television & digital media." },
            { name: "Saregama", website: "https://www.saregama.com", description: "Music label & production." },
            { name: "TV Today Network", website: "https://aajtak.in", description: "News broadcasting." },
            { name: "Nazara Technologies", website: "https://www.nazara.com", description: "Mobile gaming & sports media." }
        ]
    },
    {
        name: "Renewable Energy & Solar",
        keywords: ["solar", "energy", "power", "green", "panels", "electric"],
        brands: [
            { name: "Waaree Energies", website: "https://www.waaree.com", description: "India's largest solar PV module manufacturer." },
            { name: "Adani Solar", website: "https://www.adanisolar.com", description: "Integrated solar PV manufacturing & solutions." },
            { name: "Tata Power Solar", website: "https://www.tatapowersolar.com", description: "Comprehensive green energy solutions." },
            { name: "Vikram Solar", website: "https://www.vikramsolar.com", description: "High-efficiency solar PV modules." },
            { name: "Goldi Solar", website: "https://www.goldisolar.com", description: "Quality solar PV module manufacturer." },
            { name: "Loom Solar", website: "https://www.loomsolar.com", description: "Solar panels, lithium batteries & inverters." },
            { name: "RenewSys India", website: "https://www.renewsys.com", description: "Integrated manufacturer of solar PV modules." },
            { name: "Suzlon Energy", website: "https://www.suzlon.com", description: "Wind turbine supplier & renewable energy." },
            { name: "Borosil Renewables", website: "https://www.borosilrenewables.com", description: "Solar glass manufacturer." },
            { name: "Sterling and Wilson", website: "https://www.sterlingandwilson.com", description: "Solar EPC solutions provider." },
            { name: "ReNew Power", website: "https://renewpower.in", description: "Renewable energy IPP." },
            { name: "Ola Electric", website: "https://olaelectric.com", description: "Electric vehicles & future energy." },
            { name: "Servotech", website: "https://www.servotech.in", description: "Solar products & EV chargers." },
            { name: "Patanjali Solar", website: "https://www.patanjaliayurved.net", description: "Solar panels & renewable products." }
        ]
    },
    {
        name: "Mechanical Engineering",
        keywords: ["engineering", "machinery", "pump", "turbine", "industrial"],
        brands: [
            { name: "Larsen & Toubro (L&T)", website: "https://www.larsentoubro.com", description: "Engineering, construction, & manufacturing." },
            { name: "Godrej & Boyce", website: "https://www.godrej.com", description: "Engineering, consumer products, & security." },
            { name: "Kirloskar Brothers", website: "https://www.kirloskarpumps.com", description: "Fluid management & pumps." },
            { name: "Thermax", website: "https://www.thermaxglobal.com", description: "Energy & environment engineering." },
            { name: "BHEL", website: "https://www.bhel.com", description: "Power generation equipment manufacturer." },
            { name: "Elgi Equipments", website: "https://www.elgi.com", description: "Air compressors & automotive equipment." },
            { name: "AIA Engineering", website: "https://www.aiaengineering.com", description: "High chrome grinding media." },
            { name: "Cummins India", website: "https://www.cummins.com/en/in", description: "Diesel & natural gas engines." },
            { name: "Triveni Turbine", website: "https://www.triveniturbines.com", description: "Industrial steam turbines." },
            { name: "Praj Industries", website: "https://www.praj.net", description: "Bioenergy, engineering & wastewater treatment." },
            { name: "Lakshmi Machine Works", website: "https://www.lmwglobal.com", description: "Textile machinery manufacturer." }
        ]
    },
    {
        name: "Medical Devices & Biomedical",
        keywords: ["medical", "device", "health", "biomedical", "surgical"],
        brands: [
            { name: "Trivitron Healthcare", website: "https://www.trivitron.com", description: "Medical technology & diagnostics." },
            { name: "Poly Medicure (Polymed)", website: "https://www.polymedicure.com", description: "Disposable medical devices." },
            { name: "Transasia Bio-Medicals", website: "https://www.transasia.co.in", description: "In-vitro diagnostic equipment." },
            { name: "Hindustan Syringes (HMD)", website: "https://www.hmdhealthcare.com", description: "Medical devices & syringes (Dispovan)." },
            { name: "BPL Medical Technologies", website: "https://www.bplmedicaltechnologies.com", description: "Medical equipment & diagnostics." },
            { name: "Johari Digital", website: "https://www.joharidigital.com", description: "Electronic medical device manufacturing." },
            { name: "Meril Life Sciences", website: "https://www.merillife.com", description: "Medical devices & healthcare solutions." },
            { name: "Skanray Technologies", website: "https://www.skanray.com", description: "X-ray & critical care equipment." },
            { name: "Opto Circuits", website: "https://www.optoindia.com", description: "Medical electronics & diagnostics." }
        ]
    },
    {
        name: "Cameras & Security Systems",
        keywords: ["camera", "cctv", "security", "surveillance", "optical"],
        brands: [
            { name: "CP Plus", website: "https://www.cpplusworld.com", description: "Surveillance & security cameras." },
            { name: "Godrej Security Solutions", website: "https://www.godrej.com/godrej-security-solutions", description: "Security cameras & lockers." },
            { name: "Sparsh CCTV", website: "https://www.sparshsecuritech.com", description: "Video surveillance manufacturing." },
            { name: "Prama India", website: "https://www.pramaindia.in", description: "Security & surveillance products." },
            { name: "Zicom", website: "https://www.zicom.com", description: "Electronic security systems." },
            { name: "Secureye", website: "https://www.secureye.com", description: "Biometric & security systems." },
            { name: "Qubo", website: "https://www.quboworld.com", description: "Smart home security cameras." },
            { name: "Matrix Comsec", website: "https://www.matrixcomsec.com", description: "Security & telecom solutions." },
            { name: "Adiance", website: "https://www.adiance.com", description: "CCTV & surveillance technology." },
            { name: "Madhani Infotech", website: "https://madhaniinfotech.com", description: "Security systems & IT solutions." }
        ]
    }
];

const outputPath = path.resolve('data', 'brands.json');
fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2));

console.log(`Successfully generated verified Indian brands list at ${outputPath}`);
