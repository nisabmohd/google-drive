import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { Box } from "@mui/system";
import altimg from "../assets/alt.png";
import altimg1 from "../assets/alt1.png";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { AppContext } from "../App";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { url } from "../BaseUrl";
import StarIcon from "@mui/icons-material/Star";
import DownloadIcon from "@mui/icons-material/Download";
import {
  getStorage,
  ref as refStorage,
  getDownloadURL,
} from "firebase/storage";

export const Cardc = (props) => {
  const storage = useMemo(() => getStorage(), []);
  const context = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isStar, setIsStar] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setIsStar(props.star);
  }, [props.star]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStar = () => {
    axios
      .put(`${url}/ff/starhandle`, {
        uid: context.auth.uid,
        fileid: props.id,
      })
      .then(function (response) {
        console.log(response);
        setIsStar(!isStar);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDetele = () => {
    axios
      .put(`${url}/ff/trashhandle`, {
        uid: context.auth.uid,
        fileid: props.id,
      })
      .then(function (response) {
        console.log(response);
        props.handleRemoveFileCard(props.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async function handleDownload() {
    const fileRef = refStorage(storage, `files/${props.name}`);
    getDownloadURL(fileRef)
      .then((url) => {
        axios.get(url);
        window.open(url, "_blank");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(props.trash, props.star);
  return (
    <div ref={ref}>
      <Box
        className="card"
        sx={{ border: 1, borderColor: "divider" }}
        style={{
          width: "234px",
          height: "150px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          marginRight: "13px",
          marginTop: "19px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <a
          href={`${props.link}`}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            height: "inherit",
          }}
        >
          <div
            href={props.url}
            className="card"
            style={{
              position: "relative",
              background: `url(${props.url})`,
              overflow: "hidden",
              height: "74%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {props.type === "image/png" ||
            props.type === "image/jpeg" ||
            props.type === "image/jpg" ? (
              <>
                <img src={props.img} alt="" style={{ width: "100%" }} />
              </>
            ) : (
              <>
                <img
                  src={context.dark ? altimg1 : altimg}
                  alt=""
                  style={{ width: "100%", marginBottom: "-25px" }}
                />
              </>
            )}
          </div>
        </a>
        <MoreVertIcon
          style={{
            position: "absolute",
            right: "3px",
            bottom: "11px",
            fontSize: "16.75px",
            zIndex: "9999",
            cursor: "pointer",
          }}
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleStar} sx={{ fontFamily: "Roboto Flex" }}>
            {!isStar ? (
              <StarBorderIcon
                sx={{
                  width: "20px",
                  height: "19px",
                  fontSize: "14px",
                  marginRight: "6px",
                }}
              />
            ) : (
              <StarIcon
                sx={{
                  width: "20px",
                  height: "19px",
                  fontSize: "14px",
                  marginRight: "6px",
                  color: "#ffcd3c",
                }}
              />
            )}
            <p>{isStar ? "Unstar" : "Star"}</p>
          </MenuItem>
          <MenuItem onClick={handleDownload} sx={{ fontFamily: "Roboto Flex" }}>
            <DownloadIcon
              sx={{
                width: "20px",
                height: "19px",
                marginRight: "6px",
              }}
            />
            <p>Download</p>
          </MenuItem>
          <MenuItem onClick={handleDetele} sx={{ fontFamily: "Roboto Flex" }}>
            <DeleteOutlineIcon
              sx={{
                width: "20px",
                height: "19px",
                marginRight: "6px",
                color: "red",
              }}
            />
            <p>Remove</p>
          </MenuItem>
        </Menu>
        <a
          href={`${props.link}`}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            className="folder"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "234px",
              height: "39px",
              marginRight: "13px",
              position: "absolute",
              bottom: "0",
              backgroundColor: "inherit",
              zIndex: "55",
            }}
          >
            {props.type === "image/png" ||
            props.type === "image/jpeg" ||
            props.type === "image/jpg" ? (
              <ImageIcon style={{ width: "20px", marginLeft: "9px" }} />
            ) : (
              <></>
            )}
            {props.type === "application/pdf" ? (
              <PictureAsPdfIcon
                style={{ width: "20px", marginLeft: "9px", color: "red" }}
              />
            ) : (
              <></>
            )}
            {props.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
              <GridOnIcon
                style={{ width: "20px", marginLeft: "9px", color: "green" }}
              />
            ) : (
              <></>
            )}
            {props.type === "video/x-matroska" ||
            props.type === "video/mp4" ||
            props.type === "video/3gp" ? (
              <MovieCreationIcon
                style={{ width: "20px", marginLeft: "9px", color: "#757ce8" }}
              />
            ) : (
              <></>
            )}
            {props.type !== "video/x-matroska" &&
            props.type !== "video/mp4" &&
            props.type !== "video/3gp" &&
            props.type !==
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
            props.type !== "application/pdf" &&
            props.type !== "image/png" &&
            props.type !== "image/jpeg" &&
            props.type !== "image/jpg" ? (
              <InsertDriveFileIcon
                style={{ width: "20px", marginLeft: "9px" }}
              />
            ) : (
              <></>
            )}

            <p style={{ marginLeft: "9px", color: "inherit" }}>
              {props.name?.length > 25
                ? props.name?.slice(0, 20) + "..."
                : props.name}
            </p>
          </div>
        </a>
      </Box>
    </div>
  );
};
