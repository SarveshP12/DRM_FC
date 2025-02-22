import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-full p-4 flex justify-between items-center bg-transparent fixed">
      <h1 className="text-white text-2xl font-bold">
        Event<span className="text-[#6a2c62]">FLOW</span>
      </h1>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="bg-[#6a2c62] text-white px-4 py-2 rounded-md hover:bg-[#4a1e4a] transition-colors">
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="bg-transparent border border-[#6a2c62] text-[#6a2c62] px-4 py-2 rounded-md hover:bg-[#6a2c62] hover:text-white transition-colors">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;