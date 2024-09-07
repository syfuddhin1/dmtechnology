import VoucherNav from "./_component/Nav";

export default function VoucherLayout({ children }) {
  return (
    <div className="flex flex-col gap-4">
      <VoucherNav />
      <div>{children}</div>
    </div>
  );
}
