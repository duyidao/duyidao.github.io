import { CanvasSidebar, CssSidebar, JsSidebar, VueSidebar, ReactSidebar, TsSidebar, UpgradeSidebar, StudySidebar } from '../silber/learn.js';
import { ProjectSidebar, MyVue3Sidebar, LingsiSidebar, MusicSidebar, JobSidebar, SaleSidebar, CementSidebar, ELKSidebar, CRMSidebar, DaodaoSidebar, BaiduSidebar, LayerSidebar, FokaiSidebar, SelfstudySidebar, RabitSidebar, SelectSidebar, DoctorSidebar, BackstageSidebar, PaperSidebar, ConsultationSidebar } from '../silber/project.js';
import { ReadSidebar } from '../silber/read.js';
import { VitePressSidebar } from '../silber/vitepress.js';
import { InterviewSidebar } from '../silber/interview.js';
import { HelpSidebar } from '../silber/help.js';
import { AboutSidebar } from '../silber/about.js';

/**
 * 公共函数方法，生成侧边栏数据 ************************************************************
 */
function generateSidebarItems(arr) {
  return arr.map(item => ({
    ...item,
    text: item.text,
    ...(item.link ? { link: item.link } : {}),
    ...(item.items ? { items: generateSidebarItems(item.items) } : {}),
  }));
}

/**
 * 最终导出 ************************************************************
 */
export default {
  "/Canvas": generateSidebarItems(CanvasSidebar),
  "/CSS": generateSidebarItems(CssSidebar),
  "/Javascript": generateSidebarItems(JsSidebar),
  "/vue": generateSidebarItems(VueSidebar),
  "/React": generateSidebarItems(ReactSidebar),
  "/TypeScript": generateSidebarItems(TsSidebar),
  "/Upgrade": generateSidebarItems(UpgradeSidebar),
  "/study": generateSidebarItems(StudySidebar),
  "/interview": generateSidebarItems(InterviewSidebar),
  "/project": generateSidebarItems(ProjectSidebar),
  "/myVue3": generateSidebarItems(MyVue3Sidebar),
  "/lingsi": generateSidebarItems(LingsiSidebar),
  "/lingsi/sale": generateSidebarItems(SaleSidebar),
  "/lingsi/职技网": generateSidebarItems(JobSidebar),
  "/lingsi/水泥": generateSidebarItems(CementSidebar),
  "/lingsi/music": generateSidebarItems(MusicSidebar),
  "/lingsi/elk": generateSidebarItems(ELKSidebar),
  "/lingsi/crm": generateSidebarItems(CRMSidebar),
  "/daodao/": generateSidebarItems(DaodaoSidebar),
  "/baidu/": generateSidebarItems(BaiduSidebar),
  "/baidu/layer/": generateSidebarItems(LayerSidebar),
  "/baidu/fokai/": generateSidebarItems(FokaiSidebar),
  "/myself": generateSidebarItems(SelfstudySidebar),
  "/myself/小兔鲜": generateSidebarItems(RabitSidebar),
  "/myself/硅谷甄选": generateSidebarItems(SelectSidebar),
  "/myself/尚医通": generateSidebarItems(DoctorSidebar),
  "/myself/react后台": generateSidebarItems(BackstageSidebar),
  "/myself/知乎日报": generateSidebarItems(PaperSidebar),
  "/myself/优医问诊": generateSidebarItems(ConsultationSidebar),
  "/vitePress": generateSidebarItems(VitePressSidebar),
  "/help": generateSidebarItems(HelpSidebar),
  "/about": generateSidebarItems(AboutSidebar),
  "/read": generateSidebarItems(ReadSidebar),
};
