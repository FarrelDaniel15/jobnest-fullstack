export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} JobNest Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}