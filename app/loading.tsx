import loader from "@/assets/loader.gif";
import Image from "next/image";
function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image src={loader} alt="Loading..." height={100} width={100} />
    </div>
  );
}

export default LoadingPage;
