

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 text-center mt-auto">
      <div className="container mx-auto px-4">
        <p className="mb-2">© {new Date().getFullYear()} SliceHub. All rights reserved.</p>
        <p className="text-sm">Built with React & Tailwind CSS</p>
      </div>
    </footer>
  );
}