export default {
  items: [
      /*
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
          icon: 'icon-star'
      },
      {
          name: "Register",
          url: "/register",
          icon: 'icon-star'
      },
      {
          name: "Forgot Password?",
          url: "/forgotpassword",
          icon: 'icon-star'
      },
*/
      {
          title: true,
          name: 'Account',
          wrapper: {            // optional wrapper object
              element: '',        // required valid HTML5 element tag
              attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
          name: "Change Password",
          url: "/account/changepassword",
          icon: 'icon-star'
      },
      {
          name: "Delete Own Account",
          url: "/account/deleteownaccount",
          icon: 'icon-star'
      },
      {
          name: "Change Photo",
          url: "/account/changephoto",
          icon: 'icon-star'
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
          url: "/list/real/leagues",
          icon: 'icon-star'
      },
      {
          name: "Teams",
          url: "/list/real/teams",
          icon: 'icon-star'
      },
      {
          name: "Players",
          url: "/list/real/players",
          icon: 'icon-star'
      },
      {
          name: "All Transfer Offers",
          url: "/list/real/offers",
          icon: 'icon-star'
      },
      {
          name: "Your Pending Offers",
          url: "offers",
          icon: 'icon-star'
      }
  ]
};
