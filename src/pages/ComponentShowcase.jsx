
import OriginalAccordion from './AccordionPage/OriginalAccordion/OriginalAccordion';
import ReactBsAccordion from './AccordionPage/ReactBsAccordion/ReactBsAccordion';
import BootstrapAlert from '../components/Alert/BootstrapAlert';
import CustomAlert from '../components/Alert/CustomAlert';
import BootstrapBreadcrumb from '../components/Breadcrumb/BootstrapBreadcrumb';
import ButtonExamples from '../components/Button/ButtonExamples';
import Calendar from '../components/Calendar/Calendar';
import CustomCard from '../components/Card/CustomCard';
import OriginalCard from '../components/Card/OriginalCard';
import OriginalCollapse from './CollapsePage/OriginalCollapse/OriginalCollapse';
import ReactBsCollapse from './CollapsePage/ReactBsCollapse/ReactBsCollapse';
import CommentSystem from '../components/CommentSystem/CommentSystem';
import CustomForm from '../components/Form/CustomForm';
import CustomListGroup from '../components/ListGroup/CustomListGroup';
import OriginalGroup from '../components/ListGroup/OriginalGroup';
import BootstrapModal from '../components/Modal/BootstrapModal';
import CustomModal from '../components/Modal/CustomModal';
import BootstrapNavbar from '../components/Navbar/BootstrapNavbar';
import ReactBootstrapNavbar from '../components/Navbar/ReactBootstrapNavbar';
import BootstrapOffcanvas from '../components/Offcanvas/BootstrapOffcanvas';
import ReactOffcanvas from '../components/Offcanvas/ReactOffcanvas';
import BootstrapPagination from '../components/Pagination/BootstrapPagination';
import ReactPagination from '../components/Pagination/ReactPagination';
import ReactPagination2 from '../components/Pagination/ReactPagination2';
import ReactPagination3 from '../components/Pagination/ReactPagination3';
import BootstrapPopover from '../components/Popover/BootstrapPopover';
import CustomPopover from '../components/Popover/CustomPopover';
import BootstrapProgress from '../components/ProgressBar/BootstrapProgress';
import ProgressWithControl from '../components/ProgressBar/ProgressWithControl';
import SearchContainer from '../components/Search-container/SearchContainer.JSX';
import BootstrapSpinner from '../components/Spinner/BootstrapSpinner';
import SpinnerWithLoading from '../components/Spinner/SpinnerWithLoading';
import StepProgressBar from '../components/StepProgressBar/StepProgressBar';
import CustomTable from '../components/Table/CustomTable';
import OriginalTable from '../components/Table/OriginalTable';
import BootstrapToast from '../components/Toast/BootstrapToast';
import CustomToast from '../components/Toast/CustomToast';
import BootstrapTooltip from '../components/Tooltip/BootstrapTooltip';
import CustomTooltip from '../components/Tooltip/CustomTooltip';
import MotionBoxRightToLeft from '../motion/MotionBoxRightToLeft';
import MotionBoxRightToLeftDownToUp from '../motion/MotionBoxRightToLeftDownToUp';
import ScrollFadeIn from '../motion/ScrollFadeIn';
import ScrollScaleIn from '../motion/ScrollScaleIn';
import ScrollSlideIn from '../motion/ScrollSlideIn';
import SlideWhenInView from '../motion/SlideWhenInView';
import DiagonalParallelograms from '../test/DiagonalParallelograms';












































export default function ComponentShowcase() {
  return (
    <div className="container my-4">
      <h1>元件總覽</h1>

      <section className="mb-4">
        <h2>原始Accordion</h2>
        <OriginalAccordion />
      </section>

      <section className="mb-4">
        <h2>元件Accordion</h2>
        <ReactBsAccordion />
      </section>

      <section className="mb-4">
        <h2>原始Collapse</h2>
        <OriginalCollapse />
      </section>

      <section className="mb-4">
        <h2>元件Collapse</h2>
        <ReactBsCollapse />
      </section>

      <section className="mb-4">
        <h2>原始Card</h2>
        <OriginalCard />
      </section>

      <section className="mb-4">
        <h2>客製化Card</h2>
        <CustomCard />
      </section>

      <section className="mb-4">
        <h2>原始OriginalGroup</h2>
        <OriginalGroup />
      </section>

      <section className="mb-4">
        <h2>客製化ListGroup</h2>
        <CustomListGroup />
      </section>

      <section className="mb-4">
        <h2>原始Table</h2>
        <OriginalTable />
      </section>

      <section className="mb-4">
        <h2>客製化Table</h2>
        <CustomTable />
      </section>

      <section className="mb-4">
        <h2>客製化Form</h2>
        <CustomForm />
      </section>

      <section className="mb-4">
        <h2>按鈕</h2>
        <ButtonExamples />
      </section>

      <section className="mb-4">
        <h2>原始Modal</h2>
        <BootstrapModal />
      </section>

      <section className="mb-4">
        <h2>客製化Modal</h2>
        <CustomModal />
      </section>

      <section className="mb-4">
        <h2>原始Tooltip</h2>
        <BootstrapTooltip />
      </section>

      <section className="mb-4">
        <h2>客製化Tooltip</h2>
        <CustomTooltip />
      </section>

      <section className="mb-4">
        <h2>原始Popover</h2>
        <BootstrapPopover />
      </section>

      <div className="container mt-5">
        <h4>React 自製 Popover</h4>
        <CustomPopover triggerText="點我看更多">
          <h5>Popover 標題</h5>
          <p>這是你自定義的內容，可以放任何 React 元件。</p>
          <button className="btn btn-sm btn-outline-danger mt-2">關閉按鈕樣品</button>
        </CustomPopover>
      </div>

      <section className="mb-4">
        <h2>原始Toast</h2>
        <BootstrapToast />
      </section>

      <section className="mb-4">
        <h2>定製Toast</h2>
        <CustomToast />
      </section>

      <section className="mb-4">
        <h2>原始Alert</h2>
        <BootstrapAlert />
      </section>

      <section className="mb-4">
        <h2>定製Alert</h2>
        <CustomAlert />
      </section>

      <section className="mb-4">
        <h2>原始Spinner</h2>
        <BootstrapSpinner />
      </section>

      <section className="mb-4">
        <h2>定製Spinner</h2>
        <SpinnerWithLoading />
      </section>

      <section className="mb-4">
        <h2>原始ProgressBar</h2>
        <BootstrapProgress />
      </section>

      <section className="mb-4">
        <h2>定製ProgressBar</h2>
        <ProgressWithControl />
      </section>

      <section className="mb-4">
        <h2>原始Navbar</h2>
        <BootstrapNavbar />
        <div className="mt-4">
          <p>.navbar + .navbar-expand-lg	預設為橫向導覽，螢幕小時變漢堡選單</p>
          <p>.navbar-brand	Logo 或網站名稱</p>
          <p>.navbar-toggler	漢堡選單按鈕（需 Bootstrap JS 支援</p>
          <p>.collapse + .navbar-collapse	收合與展開區域</p>
          <p>.form-control + .btn	構成搜尋欄與按鈕</p>
        </div>
      </section>

      <section className="mb-4">
        <h2>定製Navbar</h2>
        <ReactBootstrapNavbar />
      </section>

      <section className="mb-4">
        <h2>原始Breadcrumb</h2>
        <BootstrapBreadcrumb />
      </section>

      <section className="mb-4">
        <h2>原始Pagination</h2>
        <BootstrapPagination />
      </section>

      <section className="mb-4">
        <h2>定製Pagination</h2>
        <ReactPagination />
        <ReactPagination2 />
        <ReactPagination3 />
      </section>

      <section className="mb-4">
        <h2>原始offcanvas</h2>
        <BootstrapOffcanvas />
      </section>

      <section className="mb-4">
        <h2>定製offcanvas</h2>
        <ReactOffcanvas />
      </section>

      <section className="mb-4">
        <h2>原始Calendar</h2>
        <Calendar />
      </section>

      <section className="mb-4">
        <h2>Framer Motion動畫左至右</h2>
        <MotionBoxRightToLeft />
      </section>

      <section className="mb-4">
        <h2>Framer Motion動畫下至上</h2>
        <MotionBoxRightToLeftDownToUp />
      </section>

      <section className="mb-4">
        <h2>Framer Motion當元素進入畫面中間才播放動畫</h2>
        <SlideWhenInView />
      </section>

      <div style={{ padding: '200px 0' }}>
          <ScrollFadeIn />{/* 淡入動畫 */}
          <ScrollSlideIn direction="left" />{/* 滑入動畫 */}
          <ScrollSlideIn direction="right" />{/* 滑入動畫 */}
          <ScrollSlideIn direction="up" />{/* 滑入動畫 */}
          <ScrollSlideIn direction="down" />{/* 滑入動畫 */}
          <ScrollScaleIn />{/* 放大動畫 */}      
      </div>

      <section className="mb-4">
        <h2>測試動畫</h2>
        <ScrollSlideIn direction="right">
          <h3>這是一段滑入文字</h3>
          <p>Scroll 到這裡才會觸發滑入動畫</p>
        </ScrollSlideIn>
      </section>

      <section className="mb-4">
        <h2 className="text-center">滑入畫面觸發動畫</h2>
        <DiagonalParallelograms />
      </section>

      <section className="mb-4">
        <h2>StepProgressBar進度條</h2>
        <StepProgressBar
          steps={['Step 1', 'Step 2', 'Step 3']}
          currentStep={2}
          direction="vertical" // 或 horizontal / vertical
        />
      </section>

      <section className="mb-4">
        <h2>搜尋欄</h2>
        <SearchContainer/>
      </section>

      <section className="mb-4">
        <h2>留言板</h2>
        <CommentSystem/>
      </section>


      
      
    
   
      

      
      


      
    

      
      


      
      
      

      {/* <section className="mb-4">
        <h2>Collapse</h2>
        <CustomCollapse />
      </section>

      <section className="mb-4">
        <h2>Dropdown</h2>
        <CustomDropdown />
      </section> */}
    </div>
  );
}
