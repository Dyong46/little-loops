# Nhập nội dung trong Sanity Studio

Mở http://localhost:3000/studio và đăng nhập tài khoản Sanity của project.

## 1. Danh mục

Trong thanh bên, chọn **Danh mục** rồi tạo tài liệu mới. Điền tên tiếng Việt và tiếng Anh, tạo slug bằng nút Generate, chọn nhóm sản phẩm, tải ảnh danh mục lên và nhập mô tả ảnh. Khi đã kiểm tra nội dung, bấm **Publish**. Tạo và publish danh mục trước khi gán cho sản phẩm.

## 2. Sản phẩm

Chọn **Sản phẩm**, tạo tài liệu mới, nhập tên Việt/Anh, slug, mô tả, ghi chú và chọn danh mục. Tải ảnh sản phẩm lên. Chọn giá niêm yết và nhập giá VND, hoặc chọn liên hệ báo giá. Chọn tình trạng, kiểm tra tab **Hiển thị**, rồi bấm **Publish** khi sẵn sàng. Bản nháp được lưu tự động nhưng chưa phải nội dung đã xuất bản.

## 3. Thông tin shop

Chọn **Thông tin shop** để điền URL Zalo, Messenger và Instagram, rồi Publish. Các URL phải dùng HTTPS.

## Kết nối website

Website đọc trực tiếp danh mục, sản phẩm, ảnh và liên kết liên hệ đã **Publish** trong dataset cấu hình bởi `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`. Bản nháp không hiển thị. Tắt **Hiển thị** để ẩn sản phẩm; bật **Nổi bật** để đưa vào tối đa 4 sản phẩm đầu trang (xếp theo thứ tự, rồi ngày tạo). Bộ lọc danh mục hiển thị các sản phẩm thuộc danh mục đó, kể cả sản phẩm không nổi bật. Giá, ghi chú và nội dung Việt/Anh lấy từ CMS; khi thiếu bản dịch, dùng bản còn lại.

Sau Publish, web cập nhật cache theo lượt truy cập với chu kỳ 60 giây. Lượt đầu sau khi cache hết hạn có thể thấy bản cũ trong lúc làm mới; tải lại để thấy dữ liệu mới. Không cần build lại khi sửa nội dung. Dải ảnh cuối trang lấy tối đa 5 ảnh sản phẩm, không phải feed Instagram tự động.

Lỗi truy cập CMS không được thay bằng dữ liệu mẫu. Next.js giữ bản cache thành công trước đó nếu có trong quá trình revalidation; lỗi ở lần tải đầu được xử lý bởi error boundary của Next.js.

Local và Vercel dùng cùng dataset thì dùng cùng dữ liệu. Muốn tách môi trường, tạo dataset khác và đặt biến môi trường tương ứng. Đặt các biến trong `shop.env.example` trên Vercel; `SANITY_API_READ_TOKEN` chỉ ở server và cần quyền Viewer nếu dataset riêng tư. Không cần write token cho frontend. Đổi biến môi trường cần redeploy.

Sau khi sửa schema hoặc GROQ query, chạy `npm run sanity:typegen`, rồi kiểm tra typecheck/build. `sanity.types.ts` và `schema.json` được tạo tự động; không sửa tay.

## Truy cập local

Origin http://localhost:3000 đã được thêm vào CORS với Allow credentials theo xác nhận của chủ project. Đường dẫn /studio không thuộc CORS origin. Khi triển khai Studio lên Vercel, cấu hình riêng cho URL production thực tế.
