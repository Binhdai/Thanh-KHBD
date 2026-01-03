
export enum CompetencyDomain {
  D1 = "Khai thác dữ liệu và thông tin",
  D2 = "Giao tiếp và hợp tác trong môi trường số",
  D3 = "Sáng tạo nội dung số",
  D4 = "An toàn số",
  D5 = "Giải quyết vấn đề",
  D6 = "Ứng dụng Trí tuệ nhân tạo (AI)"
}

export interface CompetencyItem {
  id: string;
  code: string;
  domain: CompetencyDomain;
  description: string;
  level: string; // L1-L2-L3 (Cơ bản), L4-L5 (Trung cấp), L6-L7 (Nâng cao)
}

export interface LessonPlan {
  title: string;
  grade: string;
  subject: string;
  duration: string;
  objectives: string;
  activities: LessonActivity[];
}

export interface LessonActivity {
  id: string;
  name: string;
  description: string;
  integratedCompetencies: string[]; // Codes like 1.1.NC1a
}

export interface AIResponse {
  analysis: string;
  suggestions: {
    activityId: string;
    competencyCode: string;
    suggestedMethod: string;
    rationale: string;
  }[];
  modifiedPlan: string;
}
