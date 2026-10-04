/**
 * ==========================================================================
 * AQUAVITA Hydro-Eco - JavaScript Application (ES6)
 * เขียนด้วย Vanilla JavaScript (ไม่พึ่งพาไลบรารีภายนอก)
 * เหมาะสำหรับผู้เริ่มต้นศึกษา DOM Manipulation, Event Handling, และ State
 * ==========================================================================
 */

// รอให้โครงสร้างเอกสาร HTML โหลดเสร็จสมบูรณ์ก่อนทำงาน (DOM Ready)
document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. DATA STORE: ข้อมูลระบบกรอง 5 ชั้น (Interactive 5-Stage Filter Data)
  // ------------------------------------------------------------------------
  // เราเก็บข้อมูลของแต่ละชั้นกรองไว้ในรูปแบบ Array of Objects
  // เพื่อให้ง่ายต่อการดึงมาแสดงผลตามลำดับ และแก้ไขข้อมูลได้ในจุดเดียว
  const filterStages = [
    {
      id: 1,
      badge: "ชั้นที่ 1 จาก 5 ชั้นกรอง",
      name: "Dual-Density Sediment Core (5 ไมครอน)",
      tag: "STAGE 1: SEDIMENT FILTER",
      description: "ด่านแรกสุดของการปกป้อง ออกแบบด้วยเส้นใยโพลีโพรพีลีนเกรดการแพทย์ความหนาแน่นสองชั้น ทำหน้าที่ดักจับสารแขวนลอยขนาดใหญ่ เช่น สนิมเหล็กจากท่อส่งน้ำเก่า ตะกอนดิน ทราย และเศษฝุ่นผง เพื่อยืดอายุการใช้งานของชั้นกรองขั้นสูงถัดไป",
      impurities: [
        "สนิมจากท่อประปาเก่า",
        "โคลนและตะกอนแขวนลอย",
        "อนุภาคดินทราย",
        "สิ่งแปลกปลอมขนาด > 5 ไมครอน"
      ],
      lifespan: "6 - 8 เดือน",
      efficiency: "99.2%",
      material: "Virgin Polypropylene 100% Food-Grade",
      tdsText: "280 → 190 PPM",
      tdsPercent: 75,
      mediaStyle: "repeating-linear-gradient(45deg, #FAF1E6, #FAF1E6 10px, #DFD3C3 10px, #DFD3C3 20px)"
    },
    {
      id: 2,
      badge: "ชั้นที่ 2 จาก 5 ชั้นกรอง",
      name: "Eco-Coconut Activated Carbon Block",
      tag: "STAGE 2: CARBON BLOCK",
      description: "แท่งคาร์บอนกะลามะพร้าวอัดแท่งธรรมชาติ ผ่านกระบวนการเผาและกระตุ้นด้วยไอน้ำความดันสูง จนได้รูพรุนระดับไมโคร ดักจับและดูดซับสารคลอรีนอิสระ สารก่อมะเร็งกลุ่มไตรฮาโลมีเทน (THMs) กลิ่นไม่พึงประสงค์ และสารเคมีเกษตรได้อย่างมีประสิทธิภาพ",
      impurities: [
        "คลอรีนอิสระตกค้าง",
        "สารไตรฮาโลมีเทน (THMs)",
        "กลิ่นคาวและสีน้ำที่ไม่พึงประสงค์",
        "สารเคมีและยาฆ่าแมลงตกค้าง"
      ],
      lifespan: "8 - 12 เดือน",
      efficiency: "99.6%",
      material: "Natural Coconut Shell Activated Carbon (เกรด NSF)",
      tdsText: "190 → 130 PPM",
      tdsPercent: 55,
      mediaStyle: "repeating-linear-gradient(135deg, #2B3A33, #2B3A33 8px, #1A2621 8px, #1A2621 16px)"
    },
    {
      id: 3,
      badge: "ชั้นที่ 3 จาก 5 ชั้นกรอง (หัวใจหลัก)",
      name: "Nanopore RO Membrane (0.0001 ไมครอน)",
      tag: "STAGE 3: RO MEMBRANE 0.0001μm",
      description: "หัวใจสำคัญที่สุดของระบบกรองน้ำบริสุทธิ์ ด้วยเยื่อเมมเบรนความละเอียดระดับนาโน 0.0001 ไมครอน (เล็กกว่าเส้นผมมนุษย์ 500,000 เท่า) ยอมให้เฉพาะโมเลกุลน้ำบริสุทธิ์ H₂O ซึมผ่าน สกัดกั้นโลหะหนักอย่างสารตะกั่ว ปรอท แคดเมียม ยาปฏิชีวนะ และไมโครพลาสติก 99.99%",
      impurities: [
        "โลหะหนัก (สารตะกั่ว, ปรอท, สารหนู)",
        "ไมโครพลาสติก (Microplastics)",
        "ไวรัส แบคทีเรีย ซีสต์",
        "สารเคมีสังเคราะห์ PFAS"
      ],
      lifespan: "18 - 24 เดือน",
      efficiency: "99.99%",
      material: "Polyamide Thin-Film Composite (TFC Medical Grade)",
      tdsText: "130 → 8 PPM (บริสุทธิ์สูงสุด)",
      tdsPercent: 15,
      mediaStyle: "linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)"
    },
    {
      id: 4,
      badge: "ชั้นที่ 4 จาก 5 ชั้นกรอง (คืนคุณค่า)",
      name: "Natural Mineral Booster & Alkaline Core",
      tag: "STAGE 4: MINERAL & ALKALINE",
      description: "เครื่องกรอง RO ทั่วไปจะทำให้น้ำขาดแร่ธาตุและมีความเป็นกรดอ่อนๆ แต่ AQUAVITA ออกแบบให้ไหลผ่านชั้นหินแร่ธรรมชาติคัดเกรด เติมไอออนของแคลเซียมและแมกนีเซียมกลับคืนมาในสัดส่วนที่ลงตัว ปรับค่า pH ให้อยู่ในช่วง 7.5 - 8.0 นุ่มนวล กลมกล่อม และดีต่อการดูดซึมของเซลล์",
      impurities: [
        "ปรับสมดุลกรด-ด่าง (pH Balance)",
        "เติม Calcium (Ca²⁺) บำรุงกระดูก",
        "เติม Magnesium (Mg²⁺) ผ่อนคลายกล้ามเนื้อ",
        "สร้างรสชาติน้ำหวานสดชื่นเป็นธรรมชาติ"
      ],
      lifespan: "12 เดือน",
      efficiency: "100% Remineralized",
      material: "Natural Maifanite & Bio-Ceramic Mineral Stones",
      tdsText: "8 → 24 PPM (สัดส่วนแร่ธาตุธรรมชาติ)",
      tdsPercent: 28,
      mediaStyle: "radial-gradient(circle, #D5E7DB 20%, #A3C9B0 80%)"
    },
    {
      id: 5,
      badge: "ชั้นที่ 5 จาก 5 ชั้นกรอง (การป้องกันขั้นตอนสุดท้าย)",
      name: "Deep UV-C LED Sterilization Module",
      tag: "STAGE 5: DEEP UV-C STERILIZER",
      description: "หลอด LED แสงอัลตราไวโอเลตความยาวคลื่น 265 นาโนเมตร (UV-C) ปราศจากสารปรอท ฆ่าเชื้อแบคทีเรียและสปอร์เชื้อราได้ถึง 99.999% ทำงานหมุนเวียนแบบอัจฉริยะทุก 1 ชั่วโมง ป้องกันการสะสมของฟิล์มชีวภาพ (Biofilm) ในระบบน้ำออก ทำให้ทุกหยดที่รินออกจากหัวก๊อกสะอาด ปลอดเชื้อ 100%",
      impurities: [
        "เชื้อราและสปอร์ในอากาศ",
        "แบคทีเรีย E. coli และ Salmonella",
        "ไวรัสและเชื้อโรคที่อาจปนเปื้อนย้อนกลับ",
        "ป้องกัน Biofilm ในท่อส่งน้ำ"
      ],
      lifespan: "มากกว่า 10 ปี (LED Lifespan > 50,000 ชม.)",
      efficiency: "99.999%",
      material: "Solid-State Mercury-Free UV-C Semi-Conductor",
      tdsText: "24 PPM (น้ำแร่ดื่มได้บริสุทธิ์และปลอดเชื้อ 100%)",
      tdsPercent: 25,
      mediaStyle: "radial-gradient(circle, #E0E7FF 15%, #818CF8 60%, #4338CA 100%)"
    }
  ];

  // ตัวแปรเก็บสถานะว่าปัจจุบันผู้ใช้กำลังดูชั้นไหนอยู่ (เริ่มต้นที่ชั้น 1)
  let currentStageIndex = 0;

  // ------------------------------------------------------------------------
  // 2. DOM ELEMENT REFERENCES (อ้างอิงองค์ประกอบใน HTML)
  // ------------------------------------------------------------------------
  const stageTabs = document.querySelectorAll('.stage-tab-btn');
  const stageBadge = document.getElementById('stageBadge');
  const stageTitle = document.getElementById('stageTitle');
  const stageDescription = document.getElementById('stageDescription');
  const impuritiesList = document.getElementById('impuritiesList');
  const specLifespan = document.getElementById('specLifespan');
  const specEfficiency = document.getElementById('specEfficiency');
  const specMaterial = document.getElementById('specMaterial');
  const cylinderMedia = document.getElementById('cylinderMedia');
  const cylinderTag = document.getElementById('cylinderTag');
  const meterBadge = document.getElementById('meterBadge');
  const meterProgress = document.getElementById('meterProgress');
  const prevStageBtn = document.getElementById('prevStageBtn');
  const nextStageBtn = document.getElementById('nextStageBtn');

  /**
   * ฟังก์ชัน renderStage: อัปเดตข้อมูลบนหน้าจอเมื่อผู้ใช้เปลี่ยนชั้นกรอง
   * @param {number} index - ตำแหน่ง Index ของชั้นกรอง (0 ถึง 4)
   */
  function renderStage(index) {
    const stage = filterStages[index];
    if (!stage) return;

    // อัปเดตสถานะ Active ของปุ่มแท็บ
    stageTabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    // อัปเดตข้อความและสเปก
    stageBadge.textContent = stage.badge;
    stageTitle.textContent = stage.name;
    stageDescription.textContent = stage.description;
    cylinderTag.textContent = stage.tag;

    // อัปเดตรายการสารตกค้าง (Target Impurities)
    impuritiesList.innerHTML = stage.impurities
      .map(item => `<li class="tag-item">${item}</li>`)
      .join('');

    // อัปเดตคุณสมบัติทางเทคนิค
    specLifespan.textContent = stage.lifespan;
    specEfficiency.textContent = stage.efficiency;
    specMaterial.textContent = stage.material;

    // อัปเดตกราฟิกตัวกระบอกไส้กรอง
    cylinderMedia.style.background = stage.mediaStyle;

    // อัปเดตแถบวัดค่า TDS
    meterBadge.textContent = stage.tdsText;
    meterProgress.style.width = `${stage.tdsPercent}%`;

    // อัปเดตปุ่ม ก่อนหน้า / ถัดไป
    prevStageBtn.disabled = index === 0;
    nextStageBtn.disabled = index === filterStages.length - 1;
  }

  // ผูก Event Listener เมื่อคลิกที่ปุ่มแท็บชั้นกรอง
  stageTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      currentStageIndex = index;
      renderStage(currentStageIndex);
    });
  });

  // ปุ่มชั้นก่อนหน้า
  prevStageBtn.addEventListener('click', () => {
    if (currentStageIndex > 0) {
      currentStageIndex--;
      renderStage(currentStageIndex);
    }
  });

  // ปุ่มชั้นถัดไป
  nextStageBtn.addEventListener('click', () => {
    if (currentStageIndex < filterStages.length - 1) {
      currentStageIndex++;
      renderStage(currentStageIndex);
    }
  });

  // แสดงผลชั้นแรกสุดเมื่อเปิดเว็บ
  renderStage(0);


  // ------------------------------------------------------------------------
  // 3. ECO & SAVINGS CALCULATOR (เครื่องคำนวณเงินออมและความคุ้มค่า)
  // ------------------------------------------------------------------------
  const familyMembersRange = document.getElementById('familyMembersRange');
  const waterIntakeRange = document.getElementById('waterIntakeRange');
  const membersDisplay = document.getElementById('membersDisplay');
  const intakeDisplay = document.getElementById('intakeDisplay');
  const savingsAmount = document.getElementById('savingsAmount');
  const bottlesReduced = document.getElementById('bottlesReduced');
  const co2Reduced = document.getElementById('co2Reduced');

  /**
   * ฟังก์ชัน calculateSavings: คำนวณเงินที่ประหยัดได้ และผลกระทบต่อสิ่งแวดล้อม
   */
  function calculateSavings() {
    const members = parseInt(familyMembersRange.value, 10);
    const intakePerPerson = parseFloat(waterIntakeRange.value);

    // อัปเดตข้อความบนหน้าจอสำหรับค่าที่เลือก
    membersDisplay.textContent = `${members} คน`;
    intakeDisplay.textContent = `${intakePerPerson.toFixed(1)} ลิตร`;

    // คำนวณปริมาณน้ำดื่มทั้งหมดต่อปี
    const totalLitersPerDay = members * intakePerPerson;
    const totalLitersPerYear = totalLitersPerDay * 365;

    // สมมติฐาน:
    // - น้ำดื่มขวด 600 มล. ราคาขวดละ 10 บาท => คิดเป็น 16.67 บาทต่อลิตร
    // - น้ำจาก AQUAVITA รวมค่าไฟและค่าเฉลี่ยไส้กรอง => ประมาณ 0.35 บาทต่อลิตร
    const bottleWaterCostPerLiter = 16.67;
    const aquavitaCostPerLiter = 0.35;

    const annualBottleCost = totalLitersPerYear * bottleWaterCostPerLiter;
    const annualAquavitaCost = totalLitersPerYear * aquavitaCostPerLiter;
    const annualSavings = Math.round(annualBottleCost - annualAquavitaCost);

    // คำนวณจำนวนขวดพลาสติก 600 มล. ที่ไม่ต้องทิ้ง
    const bottlesSaved = Math.round(totalLitersPerYear / 0.6);

    // ข้อมูลจากงานวิจัย: การผลิตขวด PET 1 ขวด ปล่อยก๊าซคาร์บอนประมาณ 0.0825 kg CO2
    const co2SavedKg = Math.round(bottlesSaved * 0.0825);

    // แสดงผลตัวเลขแบบจัดรูปแบบคั่นด้วยจุลภาค (Comma)
    savingsAmount.textContent = annualSavings.toLocaleString('th-TH');
    bottlesReduced.textContent = bottlesSaved.toLocaleString('th-TH');
    co2Reduced.textContent = co2SavedKg.toLocaleString('th-TH');
  }

  // ผูก Event Listener เมื่อเลื่อน Slider
  familyMembersRange.addEventListener('input', calculateSavings);
  waterIntakeRange.addEventListener('input', calculateSavings);

  // คำนวณครั้งแรกเมื่อโหลดหน้า
  calculateSavings();


  // ------------------------------------------------------------------------
  // 4. FAQ ACCORDION (ระบบเปิด-ปิดกล่องคำถามที่พบบ่อย)
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // ปิดกล่อง FAQ อื่นๆ ทั้งหมดก่อน เพื่อให้อ่านง่ายทีละหัวข้อ
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // สลับสถานะของกล่องที่คลิก
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ------------------------------------------------------------------------
  // 5. STICKY NAVBAR, DROPDOWN & MOBILE MENU TOGGLE
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const allNavLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-link-card, .dropdown-footer-link, .dropdown-item-simple');

  // ตรวจจับการ Scroll หน้าต่างเพื่อเพิ่มเงาให้กับ Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ปุ่มเปิด/ปิดเมนูหลักบนหน้าจอมือถือ (Hamburger Button)
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // จัดการการคลิกเปิด/ปิด Dropdown บนหน้าจอมือถือ
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // ตรวจสอบว่าอยู่บนหน้าจอขนาดเล็ก (ต่ำกว่า 768px) หรือไม่
      if (window.innerWidth <= 768) {
        e.preventDefault(); // ป้องกันการกระโดดไปยัง Anchor ทันที เพื่อให้ดูเมนูย่อยก่อน
        const parentItem = toggle.closest('.nav-item');
        if (parentItem) {
          parentItem.classList.toggle('dropdown-open');
        }
      }
    });
  });

  // เมื่อคลิกลิงก์ปลายทาง ให้ปิดเมนูมือถืออัตโนมัติ
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
      // ปิด dropdown-open ทั้งหมดบนมือถือ
      document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
        item.classList.remove('dropdown-open');
      });
    });
  });


  // ------------------------------------------------------------------------
  // 6. BOOKING & DEMO MODAL POPUP (การเปิด-ปิดหน้าต่างนัดตรวจน้ำฟรี)
  // ------------------------------------------------------------------------
  const demoModal = document.getElementById('demoModal');
  const openDemoBtn = document.getElementById('openDemoBtn');
  const orderModalBtn = document.getElementById('orderModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const modalLinks = document.querySelectorAll('.open-modal-link');

  function openModal() {
    demoModal.classList.add('open');
    demoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // ป้องกันการเลื่อนหน้าเว็บข้างหลัง
  }

  function closeModal() {
    demoModal.classList.remove('open');
    demoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // คืนค่าการเลื่อนหน้าเว็บตามปกติ
  }

  if (openDemoBtn) openDemoBtn.addEventListener('click', openModal);
  if (orderModalBtn) orderModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

  modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // ปิด Modal เมื่อคลิกที่พื้นหลังสีเทาด้านนอกตัวกล่อง
  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) {
      closeModal();
    }
  });

  // จัดการการส่งแบบฟอร์ม (Form Submit Event)
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ

    const userName = document.getElementById('userName').value.trim();
    const userPhone = document.getElementById('userPhone').value.trim();
    const userProvince = document.getElementById('userProvince').value;

    // การตรวจสอบข้อมูลเบื้องต้น (Validation)
    if (!userName || !userPhone || !userProvince) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // จำลองการส่งข้อมูลสำเร็จ
    bookingForm.style.display = 'none';
    formSuccessMessage.style.display = 'block';

    // เคลียร์ค่าฟอร์มสำหรับครั้งถัดไป
    bookingForm.reset();
  });

});
