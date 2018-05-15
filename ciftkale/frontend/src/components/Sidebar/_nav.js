export default {
  items: [

      {
          name: "Dashboard",
          url: "/dashboard",
          icon: 'icon-puzzle',
          auth: false
      },
      {
          title: true,
          name: 'Authentication',
          wrapper: {            // optional wrapper object
              element: '',        // required valid HTML5 element tag
              attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: '',             // optional class names space delimited list for title item ex: "text-center"
          auth: false
      },
      {
          name: "Login",
          url: "/login",
          icon: 'icon-user',
          auth: false
      },
      {
          name: "Register",
          url: "/register",
          icon: 'icon-user-follow',
          auth: false
      },
      {
          name: "Forgot Password?",
          url: "/forgotpassword",
          icon: 'icon-speech',
          auth: false
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
          icon: 'icon-globe'
      },
      {
          name: "Teams",
          url: "/teams",
          icon: 'icon-graph'
      },
      {
          name: "Players",
          url: "/players",
          icon: 'icon-people'
      },
      {
          name: "All Transfer Offers",
          url: "/offers",
          icon: 'icon-star',
          auth: true
      },
      {
          name: "Your Pending Offers",
          url: "/offerstoaccept",
          director: true,
          icon: 'icon-options',
          auth: true
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
          icon: 'icon-settings',
          auth: true
      },
      {
          name: "Delete Own Account",
          url: "/account/deleteownaccount",
          icon: 'icon-pencil',
          auth: true
      },
      {
          name: "Change Photo",
          url: "/account/changephoto",
          icon: 'icon-screen-smartphone',
          auth: true
      },
      {
          name: "Change Username",
          url: "/account/changeusername",
          icon: 'icon-star',
          auth: true
      },
      {
          name: "Logout",
          url: "/account/logout",
          icon: 'icon-energy',
          auth: true
      }
  ]
};
