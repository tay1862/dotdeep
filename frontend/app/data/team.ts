import type {TeamMember} from './types'

export const team: TeamMember[] = [
  {
    id: '1',
    firstName: 'DotDeep',
    lastName: 'Team',
    pictureUrl: null,
    role: {en: 'Founder & Creative Director', th: 'ผู้ก่อตั้ง & ผู้อำนวยการสร้างสรรค์', lo: 'ຜູ້ກໍ່ຕັ້ງ & ຜູ້ອໍານວຍການສ້າງສັນ'},
    bio: {
      en: 'Passionate about creating meaningful design experiences that connect brands with their audiences.',
      th: 'มีความหลงใหลในการสร้างประสบการณ์การออกแบบที่มีความหมายซึ่งเชื่อมโยงแบรนด์กับผู้ชม',
      lo: 'ມີຄວາມ ຮັກໃນການ ສ້າງ ປະສົບການ ການ ອອກແບບ ທີ່ ມີ ຄວາມ ໝາຍ',
    },
    socialLinks: {
      facebook: null,
      instagram: null,
      linkedin: null,
      tiktok: null,
      whatsapp: null,
      line: null,
    },
  },
]
