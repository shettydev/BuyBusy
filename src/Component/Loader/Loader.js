import Spinner from "react-spinner-material";

export default function Loader() {
  return (
    // styling the spinner
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "15%",
        zIndex: "999",
      }}
    >
      <div>

        <Spinner radius={120} color={"#555"} stroke={3} visible={true} />
        <h4>Loading..</h4>
      </div>
    </div>
  );
}
