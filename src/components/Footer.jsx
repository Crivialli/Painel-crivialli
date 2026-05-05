export function Footer() {
    const anoAtual = new Date().getFullYear();

    return (
        <footer className="fixed flex justify-center bg-blue-800 w-full bottom-0">
            <span className="text-white text-[12px]">{anoAtual} © Portal Crivialli</span>
        </footer>
    )
}