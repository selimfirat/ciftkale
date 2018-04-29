import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer style={{ justifyContent: "flex-end" }} className="app-footer">
          {/*
              <span><a href="http://coreui.io">CoreUI</a> &copy; 2018 creativeLabs.</span>
              <span className="ml-auto">Powered by <a href="http://coreui.io">CoreUI</a></span>
          */}

        <span>
          Share via
          <a style={{paddingLeft: "10px" }} href={"https://www.facebook.com/sharer/sharer.php?u="+ window.location.href.replace("#", "") } target="_blank">
              <button className="btn-facebook"><span> facebook</span></button>
          </a>
          <a style={{ paddingLeft: "15px" }} href={"https://twitter.com/home?status=" + window.location.href.replace("#", "")} target="_blank">
              <button className="btn-twitter"><span> twitter</span></button>
          </a>
          <a style={{ paddingLeft: "15px" }} href={"https://plus.google.com/share?url=" + window.location.href.replace("#", "")} target="_blank">
              <button className="btn-google-plus"><span> google+</span></button>
          </a>

      </span>
      </footer>
    )
  }
}

export default Footer;
