export default {
  items: [

      {
          title: true,
          name: 'Authentication',
          wrapper: {            // optional wrapper object
              element: '',        // required valid HTML5 element tag
              attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
          name: "Login",
          url: "/login",
          icon: 'icon-star',
          auth: false
      },
      {
          name: "Register",
          url: "/register",
          icon: 'icon-star',
          auth: false
      },
      {
          name: "Forgot Password?",
          url: "/forgotpassword",
          icon: 'icon-star',
          auth: false
      },

      {
          title: true,
          name: 'Account',
          wrapper: {            // optional wrapper object
              element: '',        // required valid HTML5 element tag
              attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: '',
          auth: true             // optional class names space delimited list for title item ex: "text-center"
      },
      {
          name: "Change Password",
          url: "/account/changepassword",
          icon: 'icon-star',
          auth: true
      },
      {
          name: "Delete Own Account",
          url: "/account/deleteownaccount",
          icon: 'icon-star',
          auth: true
      },
      {
          name: "Change Photo",
          url: "/account/changephoto",
          icon: 'icon-star',
          auth: true
      },
      {
          name: "Change Username",
          url: "/account/changeusername",
          icon: 'icon-star'
      },

      {
          title: true,
          name: 'Football',
          wrapper: {            // optional wrapper object
              element: '',        // required valid HTML5 element tag
              attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
          name: "Leagues",
          url: "/leagues",
          icon: 'icon-star'
      },
      {
          name: "Teams",
          url: "/teams",
          icon: 'icon-star'
      },
      {
          name: "Players",
          url: "/players",
          icon: 'icon-star'
      },
      {
          name: "All Transfer Offers",
          url: "/offers",
          icon: 'icon-star'
      },
      {
          name: "Your Pending Offers",
          url: "/offers",
          icon: 'icon-star'
      }
  ]
};
