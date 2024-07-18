import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link href={"/"}>
      <div>
        <FontAwesomeIcon icon={faAngleLeft} /> Back
      </div>
    </Link>
  );
}
