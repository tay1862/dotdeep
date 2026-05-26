import type {TeamMember} from './types'

export const team: TeamMember[] = [
  {
    id: '1',
    firstName: 'ອາພິລັກ',
    lastName: 'ຈະເລີນຜົນ',
    pictureUrl: null,
    role: {en: 'Developer & Co-Founder', th: 'นักพัฒนา & ผู้ร่วมก่อตั้ง', lo: 'ນັກພັດທະນາ & ຜູ້ຮ່ວມກໍ່ຕັ້ງ'},
    bio: {
      en: 'Full-stack developer with a passion for building fast, clean web applications that solve real problems for businesses across Laos and the region.',
      th: 'นักพัฒนา Full-stack ผู้หลงใหลในการสร้างเว็บแอปที่รวดเร็วและสะอาด เพื่อแก้ปัญหาจริงให้กับธุรกิจทั่วลาวและภูมิภาค',
      lo: 'ນັກພັດທະນາ Full-stack ທີ່ມີຄວາມຮັກໃນການສ້າງເວັບທີ່ໄວ ແລະ ສະອາດ ເພື່ອຊ່ວຍທຸລະກິດໃນລາວໃຫ້ເຕີບໂຕ',
    },
    socialLinks: {facebook: null, instagram: null, linkedin: null, tiktok: null, whatsapp: null, line: null},
  },
  {
    id: '2',
    firstName: 'ສົມຈັນ',
    lastName: 'ໄຊຍະວົງ',
    pictureUrl: null,
    role: {en: 'Graphic Designer & Co-Founder', th: 'นักออกแบบกราฟิก & ผู้ร่วมก่อตั้ง', lo: 'ນັກອອກແບບກຣາຟິກ & ຜູ້ຮ່ວມກໍ່ຕັ້ງ'},
    bio: {
      en: 'Creative graphic designer with a strong eye for brand identity and visual storytelling, dedicated to crafting designs that connect brands with their audiences.',
      th: 'นักออกแบบกราฟิกผู้มีสายตาคมชัดด้านอัตลักษณ์แบรนด์และการเล่าเรื่องด้วยภาพ มุ่งมั่นสร้างงานดีไซน์ที่เชื่อมโยงแบรนด์กับกลุ่มเป้าหมาย',
      lo: 'ນັກອອກແບບກຣາຟິກທີ່ມີຕາທີ່ຄົມສຳລັບຍີ່ຫໍ້ ແລະ ການເລົ່າເລື່ອງທາງສາຍຕາ ທຸ່ມເທໃນການສ້າງດີໄຊທ໌ທີ່ເຊື່ອມໂຍງຍີ່ຫໍ້ກັບລູກຄ້າ',
    },
    socialLinks: {facebook: null, instagram: null, linkedin: null, tiktok: null, whatsapp: null, line: null},
  },
]
