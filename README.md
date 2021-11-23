<h1> Hoevery Project </h1>
<p> <b>Application</b> <i><b>สำหรับเช่าเครื่องจักรประเภทของรถขุด</b></i> แอพพลิเคชั่นให้บริการเช่า<b>รถขุดเจาะ</b> โดยนํารถขุดเจาะเข้ามา
ใช้ร่วมกับ IoT เพื่อเพิ่มความสะดวกสบายให้แก่ผู้ใช้บริการ เนื่องมาจากผู้ใช้บริการไม่ว่าจะเป็นผู้รับเหมา
ก่อสร้างหรือเกษตรกรที่ต้องการ<b>รถขุดเจาะ</b>จะต้องติดต่อกับผู้ให้เช่าโดยตรง โดยส่วนใหญ่จะได้การแนะนำ
มาจากร้านวัสดุก่อสร้างบริเวณใกล้เคียงกับสถานที่ที่จะต้องใช้งานหรือค้นหาข้อมูลการติดต่อมาจาก internet 
เราจะเห็นได้ว่ากระบวนการการเช่า<b>รถขุดเจาะ</b>ข้างต้นนั้นมีความยุ่งยาก เพราะจะต้องติดต่อกับผู้ให้เช่าหลาย
แห่งเพื่อทำการเปรียบเทียบราคาและข้อกำหนดต่างๆ จึงทำให้เราเกิดแนวคิดในการพัฒนาแอพพลิเคชั่นการ
เช่า<b>รถขุดเจาะ</b>ที่มีความครอบคลุมหลายๆ ด้าน เช่น ผู้เช่าสามารถเห็นลักษณะของรถขุดเพื่อดูความเหมาะสม
กับงานที่ต้องการใช้งาน ผู้เช่าสามารถรู้ตำแหน่งของรถขุดที่จะเช่าได้ว่าอยู่สถานที่ไหนที่ใกล้มากที่สุดเพื่อลดค่า
ใช้จ่ายในการขนส่งและระหว่างการเช่าผู้เช่าก็สามารถตรวจสอบหรือติดตามสถานะการทำงานของรถได้อีกด้วย.</p>


<br><h2> Application </h2>
ตัวอย่าง Application
<ul>
<b>แสดงรายการรถขุดที่อยู่ใกล้</b><br>
<img src="hardware_design/listcar.png" width="350"><br><br>
<b>รายละเอียดของรถที่ให้เช่า</b><br>
<img src="hardware_design/detailcar.png" width="350"><br>
</ul>

<br><h2> Hardware </h2>
<h3>กล่องใส่อุปกรณ์</h3>
<ul>
<b>กล่องใส่อุปกรณ์ GPS Module</b><br>
<img src="hardware_design/NEO6.JPG" width="500"><br>
<b>กล่องใส่อุปกรณ์ esp32</b><br>
<img src="hardware_design/esp32.png" width="500">
</ul>

<ul>
<b>Sender</b><br><br>
<img src="hardware_design/sender_diagram.png" width="500">
<img src="hardware_design/sender_device.jpg" width="500"><br>
<b>Receive</b><br><br>
<img src="hardware_design/receive_diagram.png" width="500">
<img src="hardware_design/receive_device.jpg" width="500"><br>
</ul>

<h2>Database (PostgreSQL)</h2>
<b>ER Diagram</b><br><br>
<img src="hardware_design/er_db.png" width="500"><br>
<b>Database Table</b><br><br>
<img src="hardware_design/db.JPG" width="900"><br>

<h2>API Framework (FastAPI)</h2>
<b>API Example</b><br><br>
<img src="hardware_design/API.JPG" width="900"><br>


         - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        | COMPUTER ENGINEERING 61  | SRIPATUM UVIVERSITY        |
         - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        | CPE405(T), CPE405(L), ICT493(T),CPE451(T)             |
         - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        | Aumpu simanon            |       61033125             |
        | Bussayamas Precharburana |       610                  |
        | Panupong Aerbaim         |       610                  |
        | Parkin Thanantthanachon  |       61043845             |
         - - - - - - - - - - - - - - - - - - - - - - - - - - - -
