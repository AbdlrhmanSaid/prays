import { Card, CardContent, CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
const Prayer = ({ imge, name, time, isDone }) => {
  const loading = useSelector((state) => state.loading);

  return (
    <>
      <Card style={{ width: "100%", minHeight: "300px" }}>
        <CardMedia sx={{ height: 140 }} image={imge} title="green iguana" />
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <h4>{name}</h4>
              <h3>{time}</h3>
              {isDone && (
                <h4>
                  انتهت {""}
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: "#19d79e" }}
                  />
                </h4>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Prayer;
