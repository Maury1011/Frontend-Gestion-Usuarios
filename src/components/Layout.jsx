const Layout = ({ children }) => {
    return (
        <div className="min-h-dvh bg-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                {children}
            </div>
        </div>
    );
};

export default Layout;
