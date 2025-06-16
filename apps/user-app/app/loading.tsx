export default function loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-25">
      <div className="w-12 h-12 rounded-full border-b-2 border-gray-600 animate-spin"></div>
    </div>
  );
}
