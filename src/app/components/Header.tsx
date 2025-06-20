import Link from "next/link";

function Header() {
  return (
    <header className="flex w-full items-center justify-between px-8 py-6">
      <div className="flex flex-col leading-tight">
        <Link href="/" className="text-gradient-gold font-[AaGuDianKeBenSong] text-3xl">
          闽台非遗
        </Link>
        <div className="text-gradient-gold px-0.5 text-xs">
          闽台非物质文化遗产数字展示平台
        </div>
      </div>

      <nav className="text-gradient-gold flex gap-6 text-sm">
        <Link href="/catalog" className="transition hover:text-yellow-300">
          非遗目录
        </Link>

        <Link href="#" className="transition hover:text-yellow-300">
          关于我们
        </Link>
      </nav>
    </header>
  );
}

export default Header;
