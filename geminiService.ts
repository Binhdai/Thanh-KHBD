
import { GoogleGenAI } from "@google/genai";
import { LessonPlan, AIResponse } from "./types";
import { DIGITAL_COMPETENCY_FRAMEWORK } from "./constants";

export const analyzeLessonPlan = async (plan: LessonPlan): Promise<AIResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const frameworkContext = JSON.stringify(DIGITAL_COMPETENCY_FRAMEWORK);
  const prompt = `
    Bạn là chuyên gia giáo dục cao cấp, am hiểu sâu sắc Thông tư 02/2025/TT-BGDĐT và Hướng dẫn 3456 về xây dựng Kế hoạch bài dạy (KHBD) môn Tin học.

    NHIỆM VỤ:
    Nâng cấp KHBD của người dùng thành bản chuẩn hóa theo Phụ lục 1 và Phụ lục 3 (dành cho môn Tin học). 
    ĐẶC BIỆT: Phải phân chia nội dung rõ ràng theo số tiết (Tiết 1, Tiết 2...) tương ứng với thời lượng của bài học.

    DỮ LIỆU CƠ SỞ:
    1. Khung Năng lực số (Mã và mô tả chuẩn): ${frameworkContext}
    2. Thông tin bài dạy: Tên bài "${plan.title}", Lớp ${plan.grade}, Thời lượng: ${plan.duration}.
    3. Các hoạt động thô: ${JSON.stringify(plan.activities)}

    YÊU CẦU CHI TIẾT VỀ CẤU TRÚC KHBD (modifiedPlan):
    Phải trình bày bằng Markdown theo đúng định dạng mẫu của Bộ Giáo dục:

    I. MỤC TIÊU
    1. Kiến thức: Liệt kê các kiến thức cốt lõi.
    2. Năng lực:
       - Năng lực tin học: (NLa, NLb, NLc, NLd, NLe).
       - Năng lực chung: (Tự chủ, Giao tiếp, Giải quyết vấn đề).
       - Năng lực số (NLS): Liệt kê CHÍNH XÁC mã chỉ báo (ví dụ: 1.3.NC1.a) và mô tả biểu hiện cụ thể trong bài.
    3. Phẩm chất: (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm).

    II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
    (Các thiết bị số, phần mềm thực hành, link học liệu số...).

    III. TIẾN TRÌNH DẠY HỌC (Phân chia theo tiết học)
    --- TIẾT 1 ---
    [Liệt kê các hoạt động 1, 2...]
    --- TIẾT 2 ---
    [Liệt kê các hoạt động 3, 4...]

    Mỗi hoạt động phải gồm 4 mục chuẩn:
    a) Mục tiêu: (Nêu mục tiêu kiến thức/kỹ năng và mã NLS tích hợp).
    b) Nội dung: (Nhiệm vụ cụ thể của HS).
    c) Sản phẩm: (Kết quả học tập cụ thể).
    d) Tổ chức thực hiện: (Gồm 4 bước: Chuyển giao nhiệm vụ -> Thực hiện nhiệm vụ -> Báo cáo, thảo luận -> Kết luận, nhận định).

    KẾT QUẢ TRẢ VỀ (JSON):
    {
      "analysis": "Nhận xét về tính logic và sự phù hợp của việc phân bổ thời lượng và mã NLS.",
      "suggestions": [{"activityId": "...", "competencyCode": "...", "suggestedMethod": "Gợi ý cách dạy cụ thể để đạt mã NLS này", "rationale": "Lý do chọn mã này"}],
      "modifiedPlan": "Toàn bộ nội dung Markdown chuẩn Phụ lục 1 & 3, có tách tiết."
    }

    Lưu ý: Hãy sử dụng kiến thức từ SGK (như SQL cho lớp 11, GIMP cho lớp 10/11, AI cho lớp 12) để làm ví dụ minh họa sống động. Trả về JSON thuần.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-09-2025',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        maxOutputTokens: 66536,
        responseMimeType: "application/json"
      },
    });

    const text = response.text;
    if (!text) throw new Error("AI không trả về nội dung.");
    return JSON.parse(text) as AIResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Lỗi hệ thống AI. Vui lòng kiểm tra lại nội dung bài học.");
  }
};
