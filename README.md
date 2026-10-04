# MYPRODUCT Showcase

โครงสร้างโปรเจกต์ได้รับการจัดระเบียบและแยกโมดูลไฟล์ HTML ตามส่วนประกอบหลัก (Component/Section-based) พร้อมระบบ Build Script ในตัวที่ไม่จำเป็นต้องติดตั้ง dependency ภายนอกเพิ่มเติม

## โครงสร้างโฟลเดอร์ (Project Structure)

```text
water-purifier-showcase/
├── src/
│   ├── index.html                   # Master Template สำหรับประกอบชิ้นส่วน
│   └── sections/                    # โฟลเดอร์แยกไฟล์ส่วนประกอบแต่ละ Section
│       ├── header.html              # 1. แถบเมนูด้านบน (Navigation & Dropdown)
│       ├── hero.html                # 2. Hero Section & Product Showcase
│       ├── features.html            # 3. จุดเด่นหลัก 4 ประการ (Features Grid)
│       ├── filter-journey.html      # 4. แบบจำลอง Interactive 5 ชั้นกรอง
│       ├── comparison.html          # 5. ตารางเปรียบเทียบคุณภาพน้ำ
│       ├── calculator.html          # 6. เครื่องคำนวณเงินออม & ขยะพลาสติก
│       ├── specs.html               # 7. สเปกตัวเครื่องเชิงเทคนิค
│       ├── faq.html                 # 8. คำถามที่พบบ่อย (Accordion)
│       ├── modal.html               # 9. แบบฟอร์มนัดตรวจน้ำฟรี (Popup Dialog)
│       └── footer.html              # 10. ส่วนท้ายเว็บไซต์ & ข้อมูลติดต่อ
├── build.js                         # สคริปต์คอมไพล์ HTML & Auto-watcher (Node.js)
├── index.html                       # ไฟล์ผลลัพธ์ที่รวมสมบูรณ์ (พร้อม Deploy / เปิดดูได้ทันที)
├── styles.css                       # ไฟล์สไตล์หลัก
├── script.js                        # ไฟล์ JavaScript หลัก
└── package.json                     # กำหนดคำสั่ง build และ dev (watch mode)
```

---

## คำสั่งการใช้งาน (Available Commands)

### 1. คอมไพล์ไฟล์ครั้งเดียว (Single Build)
เมื่อมีการแก้ไขไฟล์ใดๆ ใน `src/` ให้รันคำสั่ง:
```bash
npm run build
```
*(หรือรันผ่าน `node build.js`)*

### 2. โหมดตรวจจับการแก้ไขอัตโนมัติ (Watch Mode)
ตรวจจับทุกการเซฟไฟล์ในโฟลเดอร์ `src/` และคอมไพล์ลง `index.html` ทันทีภายใน 10-15ms:
```bash
npm run dev
```
*(หรือ `npm run watch`)*

### 3. การเปิดใช้งานเว็บไซต์ (Deployment & Preview)
ไฟล์ [index.html](file:///d:/E/water-purifier-showcase/index.html) ที่ root เป็นไฟล์ Pure HTML ที่รวมครบทุกส่วน สามารถดับเบิลคลิกเปิดบนเบราว์เซอร์ได้ทันที หรือนำขึ้น Static Hosting (เช่น GitHub Pages, Vercel, Netlify) ได้โดยตรงโดยไม่มี overhead ใดๆ
