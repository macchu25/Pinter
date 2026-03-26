# Walkthrough: Multi-Niche Adsense Website (Decoupled Architecture)

Dự án website đa niche đã được nâng cấp lên kiến trúc tách biệt Backend và Frontend để tăng tính linh hoạt và mở rộng.

## Các tính năng chính

- **Kiến trúc tách biệt (Decoupled):** BE (Express/MongoDB) và FE (Next.js) chạy độc lập.
- **Trang chủ (Home):** Hiển thị lưới bài viết đa niche.
- **Tối ưu SEO:** Vẫn duy trì cơ chế SSR của Next.js thông qua việc gọi API từ Server Components.
- **Quảng cáo (AdSense):** Các khu vực `AdSlot` đã được bố trí sẵn.
- **API Centralized:** Quản lý việc gọi dữ liệu tập trung tại `src/lib/api.ts`.

## Cách chạy dự án

### 1. Backend (Chạy trước)
```bash
cd server
npm install
npm run dev # Chạy tại http://localhost:5001
```

### 2. Frontend
```bash
npm install
npm run dev # Chạy tại http://localhost:3000
```

## Cấu trúc thư mục

- `server/`: 
  - `index.ts`: Entry point của Express.
  - `models/`: Mongoose Models.
  - `lib/mongodb.ts`: Kết nối DB.
- `src/`:
  - `lib/api.ts`: API client.
  - `app/`: Next.js App Router (Pages & SEO).
  - `components/`: UI Components.

## Hướng dẫn sử dụng & Cấu hình
- **MongoDB:** Cấu hình `MONGODB_URI` trong `server/.env`.
- **API URL:** Cấu hình `NEXT_PUBLIC_API_URL` trong `.env` của Frontend (mặc định là localhost:5001/api).
