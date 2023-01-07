import Layout from "../../Layout/Layout";
import Navigation from "../../Layout/Navigation";
import { useEffect, useState } from "react";
import "../../style/News.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { bindParam } from "../../config/function";
import { NEWS_DETAIL } from "../../config/path";
import { API_NEWS } from "../../config/endpointapi";
import "../../style/GeneralRole.scss";
const GeneralRole = () => {
  const [post, setPost] = useState();
  const [keyword, setKeyword] = useState("");
  const [limit] = useState(1000);
  const [page] = useState(1);

  useEffect(() => {
    const getNews = async () => {
      const params = { limit, page, keyword };
      await axios
        .get(API_NEWS, { params })
        .then((res) => {
          setPost(res?.data?.data?.data);
          console.log(post);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getNews();
  }, []);
  return (
    <Layout>
      <Navigation></Navigation>
      <div className="generalrole">
        <div className="container">
          <h1 className="mt-2">Điều khoản quy định của rạp</h1>
          <div>
            <h2>1.Tạo tài khoản</h2>
            <div className="detail">
              Cung cấp những thông tin chính xác, đầy đủ theo bản đăng ký mẫu
              của LongDT Cinema. Duy trì và cập nhật những thông tin, thay đổi
              mới nhất một cách chính xác và đầy đủ. Trong trường hợp những
              thông tin quý khách hàng cung cấp không chính xác có thể làm quý
              khách hàng không tận dụng được hết những sản phẩm và dịch vụ của
              LongDT Cinema cung cấp. Trong một số trường hợp đặc biệt, LongDT
              Cinema có quyền từ chối cung cấp dịch vụ cho quý khách hàng và
              đình chỉ tài khoản của quý khách hàng vào thời điểm hiện tại và
              trong tương lai nếu những thông tin mà quý khách hàng cung cấp
              không chính xác hoặc LongDT Cinema có lý do nghi ngờ tính trung
              thực của những thông tin mà quý khách hàng cung cấp. Khách Hàng có
              thể lựa chọn cung cấp hoặc không cung cấp cho LongDT Cinema một số
              thông tin nhất định. Tuy nhiên, không cung cấp thì cũng có thể
              đồng nghĩa với việc Khách Hàng không tận dụng được tất cả các tính
              năng mà LongDT Cinema cung cấp cho Khách Hàng. LongDT Cinema sẽ
              không sử dụng những thông tin cá nhân của quý khách hàng ngoài
              những mục đích nêu tại Chính Sách Bảo Mật nếu chưa được sự cho
              phép của quý khách hàng. Quý khách hàng có thể yên tâm rằng khi
              quý khách hàng cung cấp thông tin cho LongDT Cinema, thông tin của
              quý khách hàng luôn được bảo mật tuyệt đối. Quyền truy cập và sử
              dụng tài khoản chỉ dành riêng cho cá nhân có thẩm quyền. Mọi hành
              vi cố ý truy cập trái phép đều có thể bị xử lý theo quy định của
              pháp luật.
            </div>
            <h2>1.Trách nhiệm người sử dụng</h2>
            <div className="detail">
              Khi truy cập vào Website này, quý khách hàng đồng ý chấp nhận mọi
              rủi ro. LongDT Cinema và các bên đối tác khác không chịu trách
              nhiệm về bất kỳ tổn thất nào do những hậu quả trực tiếp, tình cờ
              hay gián tiếp; những thất thoát, chi phí (bao gồm chi phí pháp lý,
              chi phí tư vấn hoặc các khoản chi tiêu khác) có thể phát sinh trực
              tiếp hoặc gián tiếp do việc truy cập Website hoặc khi tải dữ liệu
              về máy tính, thiết bị di động thông minh; những tổn hại gặp phải
              do virus, hành động phá hoại trực tiếp hay gián tiếp của hệ thống
              máy tính khác, đường dây điện thoại, phần cứng, phần mềm, lỗi
              chương trình, hoặc bất kì các lỗi nào khác; đường truyền dẫn của
              máy tính hoặc nối kết mạng bị chậm… LongDT Cinema yêu cầu quý
              khách hàng khi đăng ký là thành viên của LongDT Cinema phải cung
              cấp đầy đủ thông tin cá nhân có liên quan như: Họ và tên, địa chỉ
              liên lạc, email, điện thoại, số tài khoản
            </div>
            <h2>3. Về nội dung trên Website:</h2>
            <div className="detail">
              Tất cả những thông tin được đăng tải trên Website được cung cấp
              cho quý khách hàng một cách trung thực như bản thân sự việc, tuy
              nhiên, LongDT Cinema không kèm theo bất kỳ cam kết nào. LongDT
              Cinema và các bên liên quan không bảo đảm, hay có bất kỳ tuyên bố
              nào liên quan đến tính chính xác, độ xác thực, độ tin cậy của việc
              sử dụng hay kết quả của việc sử dụng nội dung trên Website này.
              LongDT Cinema luôn cố gắng cập nhật toàn bộ thông tin một cách
              thường xuyên, kịp thời nhưng LongDT Cinema không bảo đảm rằng
              những nội dung hiện tại là mới nhất, chính xác hay đầy đủ nhất.
              Tất cả các nội dung Website có thể được thay đổi bất kỳ lúc nào.
              LongDT Cinema giữ quyền thay đổi, chỉnh sửa và loại bỏ những thông
              tin hợp pháp vào bất kỳ thời điểm nào vì bất kỳ lý do nào. LongDT
              Cinema lưu ý: Quý khách hàng vui lòng cập nhật thường xuyên
              Website để biết những thay đổi hoặc đọc kỹ lại các Quy Định Chung,
              Điều Kiện và Điều Khoản Giao Dịch, Chính Sách Bảo Mật và những quy
              định khác trước khi thực hiện giao dịch. Tất cả thông tin, bao gồm
              nội dung, phần mềm, dữ liệu… được đăng tải lên Website và các sản
              phẩm liên quan của LongDT Cinema đều thuộc bản quyền của LongDT
              Cinema, quý khách hàng có thể tải về và sử dụng. Nhưng những nội
              dung đó không thuộc quyền sở hữu của quý khách hàng, nên LongDT
              Cinema nghiêm cấm mua bán, phân phối, bẻ khoá, sao chép, sửa đổi
              hay sử dụng bất kỳ nội dung nào mà không có sự đồng ý của LongDT
              Cinema. Quý khách hàng có thể sử dụng những thông tin thuộc quyền
              sở hữu của LongDT Cinema để chia sẻ trên mạng với điều kiện phải
              trích rõ nguồn và chủ sở hữu thông tin.
            </div>
            <h2>4. Về việc thu thập, sử dụng, chia sẻ, bảo mật thông tin:</h2>
            <div className="detail">
              LongDT Cinema sẽ sử dụng thông tin cá nhân của quý khách hàng trên
              Website này với các mục đích: Cung cấp các dịch vụ, sản phẩm theo
              nhu cầu của Khách Hàng; Liên hệ xác nhận khi Khách Hàng đăng ký sử
              dụng dịch vụ, xác lập giao dịch trên Website; Thực hiện việc quản
              lý Website, gửi thông tin cập nhật về Website, các chương trình
              khuyến mại, ưu đãi/tri ân tới Khách Hàng; Bảo đảm quyền lợi của
              Khách Hàng khi phát hiện các hành động giả mạo, phá hoại tài
              khoản, lừa đảo Khách Hàng; Liên lạc, hỗ trợ, giải quyết với Khách
              Hàng trong các trường hợp đặc biệt; … Việc thu thập, sử dụng, chia
              sẻ, bảo mật thông tin của quý khách hàng được quy định cụ thể tại
              Chính Sách Bảo Mật thông tin được đăng tải trên Website này.
            </div>
            <h2>5. Ý kiến, bình luận, tranh chấp của người sử dụng</h2>
            <div className="detail">
              LongDT Cinema không chịu trách nhiệm sàng lọc, chỉnh sửa hoặc giám
              sát nội dung được người sử dụng đăng tải lên website và các sản
              phẩm liên quan, cũng như không thể đảm bảo tính chính xác của
              những ý kiến, bình luận này. Nếu nhận được thông tin về những vi
              phạm, gây tổn hại hoặc bất hợp pháp, LongDT Cinema có quyền điều
              tra những cáo buộc trên để xác minh, và có quyền quyết định chấm
              dứt cung cấp dịch vụ đối với thành viên vi phạm những điều khoản
              sử dụng. Quý khách hàng không được đưa lên, hoặc chuyển tải lên
              Website tất cả những hình ảnh, từ ngữ khiêu dâm, thô tục, xúc
              phạm, phỉ báng, bôi nhọ, đe dọa, những thông tin không hợp pháp
              hoặc những thông tin có thể đưa đến việc vi phạm pháp luật, trách
              nhiệm pháp lý. LongDT Cinema và tất cả các bên có liên quan đến
              việc xây dựng và quản lý Website không chịu trách nhiệm hoặc có
              nghĩa vụ pháp lý đối với những phát sinh từ nội dung do quý khách
              hàng tải lên Website. Mặc dù đã có những quy định nêu trên, nhưng
              LongDT Cinema cũng như những cá thể, tập thể liên quan không thể
              bảo đảm có thể chỉnh sửa hoặc xoá bỏ lập tức những nội dung vi
              phạm. Cũng như LongDT Cinema không phải chịu trách nhiệm pháp lý
              đối với những nội dung do quý khách hàng đăng tải trên Website của
              LongDT Cinema. Đồng thời, quý khách hàng cũng có trách nhiệm cho
              mối liên hệ giữa quý khách hàng và những người dùng khác. LongDT
              Cinema có quyền, nhưng không có nghĩa vụ theo dõi các tranh chấp
              giữa các người dùng với nhau.
            </div>
            <h2>6. Liên kết với các trang website khác:</h2>
            <div className="detail">
              Website này có thể được liên kết với những trang website khác,
              LongDT Cinema không trực tiếp hay gián tiếp quản lý những website
              liên kết. LongDT Cinema không hợp tác, tài trợ, xác thực, đứng sau
              hay sát nhập với những website đó, trừ khi sự hợp tác đó được công
              bố rõ ràng. Khi truy cập vào Website, LongDT Cinema hy vọng quý
              khách hàng có thể hiểu rằng LongDT Cinema không kiểm soát, quản lý
              những trang liên kết và không chịu trách nhiệm về nội dung của bất
              kỳ website liên kết nào.
            </div>
            <h2>7. Thông tin liên hệ:</h2>
            <div className="detail">
              Mọi câu hỏi, thắc mắc, cần hỗ trợ, cần giải thích, khiếu nại hoặc
              quan tâm về các dịch vụ/hàng hóa trên Website của LongDT Cinema,
              xin quý khách hàng vui lòng liên hệ LongDT Cinema theo thông tin
              sau:
              <br />
              Email:longtuan2k@gmail.com
              <br />
              SDT:0973818134
              <br />
              Địa chỉ:Mỹ Đình,Từ Liêm, Hà Nội
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default GeneralRole;
