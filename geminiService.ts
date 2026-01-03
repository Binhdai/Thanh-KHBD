
import { GoogleGenAI, Type } from "@google/genai";
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

    I. MỤC TIÊU (Kiến thức, Năng lực tin học, Năng lực chung, Năng lực số - ghi rõ mã, Phẩm chất)
    II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
    III. TIẾN TRÌNH DẠY HỌC (Phân chia theo tiết học: --- TIẾT 1 ---, --- TIẾT 2 ---...)
    Mỗi hoạt động phải gồm 4 mục chuẩn: a) Mục tiêu (có mã NLS), b) Nội dung, c) Sản phẩm, d) Tổ chức thực hiện (4 bước).

    Hãy sử dụng kiến thức từ SGK (SQL cho lớp 11, GIMP cho lớp 10/11, AI cho lớp 12) để làm ví dụ minh họa.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-09-2025',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        maxOutputTokens: 66536,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.STRING,
              description: "Nhận xét tổng quan về việc tích hợp NLS và phân bổ thời lượng."
            },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  activityId: { type: Type.STRING },
                  competencyCode: { type: Type.STRING },
                  suggestedMethod: { type: Type.STRING },
                  rationale: { type: Type.STRING }
                },
                required: ["activityId", "competencyCode", "suggestedMethod", "rationale"]
              }
            },
            modifiedPlan: {
              type: Type.STRING,
              description: "Toàn bộ nội dung giáo án Markdown chuẩn Phụ lục 1 & 3, có tách tiết rõ ràng."
            }
          },
          required: ["analysis", "suggestions", "modifiedPlan"]
        }
      },
    });

    const text = response.text;
    if (!text) throw new Error("AI không trả về nội dung.");
    return JSON.parse(text) as AIResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Lỗi hệ thống AI khi xử lý dữ liệu. Vui lòng thử lại với nội dung ngắn gọn hơn hoặc kiểm tra kết nối.");
  }
};
