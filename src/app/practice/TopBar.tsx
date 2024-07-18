import BackButton from "./BackButton";

export default function TopBar() {
  return (
    <div className="flex justify-center items-center bg-gray-200 px-8 py-2 border border-b-black border-b-2">
      <div className="flex-1">
        <BackButton />
      </div>
      <p className="flex-1 capitalize font-medium text-xl text-center">
        Common words
      </p>
      <div className="flex-1" />
    </div>
  );
}
