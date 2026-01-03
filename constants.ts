
import { CompetencyDomain, CompetencyItem } from './types';

export const DIGITAL_COMPETENCY_FRAMEWORK: CompetencyItem[] = [
  // D1: Khai thác dữ liệu và thông tin
  { id: "1.1a", code: "1.1.NC1.a", domain: CompetencyDomain.D1, description: "Đáp ứng được nhu cầu thông tin.", level: "THPT" },
  { id: "1.1b", code: "1.1.NC1.b", domain: CompetencyDomain.D1, description: "Áp dụng được kỹ thuật tìm kiếm để lấy được dữ liệu, thông tin và nội dung trong môi trường số.", level: "THPT" },
  { id: "1.1c", code: "1.1.NC1.c", domain: CompetencyDomain.D1, description: "Chỉ cho người khác cách truy cập những dữ liệu, thông tin và nội dung này cũng như điều hướng giữa chúng.", level: "THPT" },
  { id: "1.1d", code: "1.1.NC1.d", domain: CompetencyDomain.D1, description: "Tự đề xuất được chiến lược tìm kiếm.", level: "THPT" },
  { id: "1.2a", code: "1.2.NC1.a", domain: CompetencyDomain.D1, description: "Thực hiện đánh giá được độ tin cậy của các nguồn dữ liệu, thông tin và nội dung số.", level: "THPT" },
  { id: "1.3a", code: "1.3.NC1.a", domain: CompetencyDomain.D1, description: "Thao tác được thông tin, dữ liệu và nội dung để tổ chức, lưu trữ và truy xuất dễ dàng hơn.", level: "THPT" },
  { id: "1.3b", code: "1.3.NC1.b", domain: CompetencyDomain.D1, description: "Triển khai được việc tổ chức và sắp xếp dữ liệu, thông tin và nội dung trong môi trường có cấu trúc.", level: "THPT" },
  
  // D2: Giao tiếp và Hợp tác
  { id: "2.1a", code: "2.1.NC1.a", domain: CompetencyDomain.D2, description: "Sử dụng được nhiều công nghệ số để tương tác.", level: "THPT" },
  { id: "2.2a", code: "2.2.NC1.a", domain: CompetencyDomain.D2, description: "Chia sẻ dữ liệu, thông tin và nội dung số thông qua nhiều công cụ số phù hợp.", level: "THPT" },
  { id: "2.2c", code: "2.2.NC1.c", domain: CompetencyDomain.D2, description: "Áp dụng được nhiều phương pháp tham chiếu và ghi nguồn khác nhau.", level: "THPT" },
  { id: "2.4a", code: "2.4.NC1.a", domain: CompetencyDomain.D2, description: "Đề xuất được các công cụ và công nghệ số khác nhau cho các quá trình hợp tác.", level: "THPT" },
  { id: "2.5a", code: "2.5.NC1.a", domain: CompetencyDomain.D2, description: "Áp dụng được các chuẩn mực hành vi và bí quyết khác nhau khi sử dụng công nghệ số.", level: "THPT" },
  
  // D3: Sáng tạo nội dung số
  { id: "3.1a", code: "3.1.NC1.a", domain: CompetencyDomain.D3, description: "Áp dụng được các cách tạo và chỉnh sửa nội dung ở các định dạng khác nhau.", level: "THPT" },
  { id: "3.2a", code: "3.2.NC1.a", domain: CompetencyDomain.D3, description: "Sửa đổi, tinh chỉnh, cải thiện và tích hợp nội dung mới để tạo ra những mục mới và độc đáo.", level: "THPT" },
  { id: "3.3a", code: "3.3.NC1.a", domain: CompetencyDomain.D3, description: "Áp dụng được các quy định khác nhau về bản quyền và giấy phép.", level: "THPT" },
  { id: "3.4a", code: "3.4.NC1.a", domain: CompetencyDomain.D3, description: "Tự thao tác được bằng các hướng dẫn dành cho hệ thống máy tính để giải quyết vấn đề.", level: "THPT" },

  // D4: An toàn
  { id: "4.1a", code: "4.1.NC1.a", domain: CompetencyDomain.D4, description: "Áp dụng được các cách khác nhau để bảo vệ thiết bị và nội dung số.", level: "THPT" },
  { id: "4.2a", code: "4.2.NC1.a", domain: CompetencyDomain.D4, description: "Áp dụng được các cách thức khác nhau để bảo vệ dữ liệu cá nhân và quyền riêng tư.", level: "THPT" },

  // D5: Giải quyết vấn đề
  { id: "5.1a", code: "5.1.NC1.a", domain: CompetencyDomain.D5, description: "Đánh giá được các vấn đề kỹ thuật khi sử dụng môi trường số và vận hành thiết bị số.", level: "THPT" },
  { id: "5.3a", code: "5.3.NC1.a", domain: CompetencyDomain.D5, description: "Áp dụng được các công cụ và công nghệ số khác nhau để tạo ra kiến thức và sản phẩm mới.", level: "THPT" },

  // D6: Ứng dụng AI
  { id: "6.1a", code: "6.1.NC1.a", domain: CompetencyDomain.D6, description: "Phân tích được cách AI hoạt động trong các ứng dụng cụ thể.", level: "THPT" },
  { id: "6.2c", code: "6.2.NC1.c", domain: CompetencyDomain.D6, description: "Đánh giá và giảm thiểu được các rủi ro đạo đức và pháp lý liên quan đến việc sử dụng AI.", level: "THPT" },
  { id: "6.3a", code: "6.3.NC1.a", domain: CompetencyDomain.D6, description: "Đánh giá được độ chính xác và tin cậy của các hệ thống AI.", level: "THPT" }
];

export const GRADES = ["10", "11", "12"];
