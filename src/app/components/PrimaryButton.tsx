import { ReactNode } from "react";

function PrimaryButton(props: { onClick?: () => void; children: ReactNode }) {
  return (
    <button
      onClick={props.onClick}
      className="text-gradient-gold cursor-pointer rounded-xl border border-yellow-100 px-6 py-2 font-[DingLieSong] transition hover:border-yellow-300 hover:text-yellow-300"
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
