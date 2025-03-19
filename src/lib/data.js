export const templates = [
  {
    id: 0,
    category: "Custom",
    image: "https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/dummy+email+template.jpg",
  },

  {
    id: 3,
    category: "Announcement",
    image: "https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/announcement.png",
    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Teams Announcement</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Inter', sans-serif;">
    <table
      style="width: 100%; max-width: 600px; background-color: white; border-collapse: collapse; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-radius: 15px; margin: 0 auto;"
    >
      <!-- Header Section -->
      <tr>
        <td
          class="header"
          style="background-image: url('https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Frame+1010110237.png'); background-size: cover; height: 200px; text-align: left; padding: 0; position: relative; overflow-x: hidden; "
        >
          <img
            src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/techserve+logo.png"
            alt="Header Image"
            style="position: absolute; top: 30px; left: 10px; width: 50%; max-width: 250px; border-radius: 5px; z-index: 2; "
          />
        </td>
      </tr>

      <tr>
        <td>
          <div
            style="width: 100%; height: 5px; background-color: rgba(51, 141, 251, 1); margin-top: 4px; "
          ></div>
        </td>
      </tr>

      <!-- Image Section -->
      <tr>
        <td align="center" style="position: relative;">
          <img
            align="center"
            src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/cuate.png"
            alt="Welcome Image"
            style="width: 50%; max-width: 200px; height: auto; margin-top: -100px; border-radius: 10px; background-color: #fff; z-index: 2; "
          />
        </td>
      </tr>

      <!-- Content Section -->
      <tr>
        <td
          class="content"
          style="text-align: center; color: rgba(51, 141, 251, 1); padding: 0 20px;"
        >
          <div
            style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; position: relative;"
          >
            <img
              src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Ellipse+2670.png"
              style="max-width: 400px; height: auto; margin-top: -170px; "
            />
          </div>
          <h1
            style="font-weight: 700; font-size: 2vw; margin-top: -180px; font-family: 'Inter', sans-serif; z-index: 99;"
          >
            Team are here!
          </h1>
          <p
            style="font-size: 1vw; margin-bottom: 25px; color: rgba(51, 141, 251, 1); z-index: 99;"
          >
            Today you can invite your team to start <br /> collaborating on user
            insights
          </p>
        </td>
      </tr>

      <!-- Button Section -->
      <tr>
        <td
          class="grow-section"
          style="display: flex; margin-left: 40px; margin-top: 40px"
        >
          <h2
            style="color: rgba(64, 123, 255, 1); font-size: 1vw; font-family: 'Inter', sans-serif; display: flex;"
          >
            COME GROW WITH US:
          </h2>
        </td>
      </tr>

      <!-- Circle Container -->
      <tr>
        <td
          class="circle-container"
          style="display: flex; justify-content: space-evenly; margin-top: 20px; width: 100%; padding: 0px; flex-wrap: wrap;"
        >
          <!-- Circle 1 -->
          <div
            class="circle"
            style="width: 22%; height: 135px; background-color: #fff; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0px 4px 10px rgba(51, 141, 251, 0.3); margin-bottom: 20px;"
          >
            <img
              src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/building+projection.png"
              alt="Build"
              style="width: 25%;"
            />
            <h4 style="margin-top: 10px; color: #000; font-size: 14px">Build</h4>
            <p
              style="font-size: 10px; color: #000; text-align: center; width: 110px; margin-top: -10px;"
            >
              Alone we can do so little, together we can do so much.
            </p>
          </div>

          <!-- Circle 2 -->
          <div
            class="circle"
            style="width: 22%; height: 135px; background-color: #fff; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0px 4px 10px rgba(51, 141, 251, 0.3); margin-bottom: 20px;"
          >
            <img
              src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/growing+graph+icon.png"
              alt="Grow"
              style="width: 25%;"
            />
            <h4 style="margin-top: 10px; color: #000; font-size: 14px">Grow</h4>
            <p
              style="font-size: 10px; color: #000; text-align: center; width: 110px; margin-top: -10px; line-height: 10px;"
            >
              Growth, in some curious way, depends on being always in motion.
            </p>
          </div>

          <!-- Circle 3 -->
          <div
            class="circle"
            style="width: 22%; height: 135px; background-color: #fff; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0px 4px 10px rgba(51, 141, 251, 0.3); margin-bottom: 20px;"
          >
            <img
              src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/monitor+with+small+text+on+the+screen.png"
              alt="Monitor"
              style="width: 25%; "
            />
            <h4 style="color: #000; font-size: 14px">Monitor</h4>
            <p
              style="font-size: 10px; color: #000; text-align: center; width: 110px; margin-top: -10px;"
            >
              From visionary leaders to creative minds.
            </p>
          </div>

          <!-- Circle 4 -->
          <div
            class="circle"
            style="width: 22%; height: 135px; background-color: #fff; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0px 4px 10px rgba(51, 141, 251, 0.3); margin-bottom: 20px;"
          >
            <img
              src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Medication+schedule+calendar.png"
              alt="Schedule"
              style="width: 25%; margin-bottom: 10px;"
            />
            <h4 style="margin-top: -10px; color: #000; font-size: 14px">Schedule</h4>
            <p
              style="font-size: 10px; color: #000; text-align: center; width: 110px; margin-top: -10px;"
            >
              Success seems to be connected with action.
            </p>
          </div>
        </td>
      </tr>

      <!-- Footer Section -->
      <tr>
        <td
          class="footer"
          style="background-color: rgba(51, 141, 251, 1); text-align: center; padding: 15px 20px; position: relative; color: white; border-radius: 20px 20px 8px 0px; width: 100%; padding-bottom: 20px;"
        >
          <p
            style="margin: 5px 0; font-size: 14px;"
          >
            support mail-hr@wishgeekstechserve.com
          </p>
          <p
            style="margin: 5px 0; font-size: 14px;"
          >
            Contact Us- <strong>8700133076</strong>
          </p>
          <a
            href="#"
            style="color: white; font-size: 16px; font-weight: 700; text-decoration: none;"
            >Unsubscribe</a
          >
        </td>
      </tr>
    </table>
  </body>
</html>




      `,
    title: "Select Template 2 ",
  },
  {
    id: 4,
    category: "Announcement",
    image: "https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/announcement.png",

    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="margin: 0; padding: 0; overflow-x: hidden;">
    <table style="width: 100%; max-width: 600px; height: 100%; position: relative; margin: 0 auto; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); overflow-x: hidden; overflow-y: hidden;">
      <!-- Header Image -->
      <tr>
        <td class="imge-back" style="background-size: cover; background-position: center; background-repeat: no-repeat; height: 100px; position: relative;">
          <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Rectangle+7198.jpg" style="width: 100%; height: auto;" />
        </td>
      </tr>
      
      <!-- Logo and Text -->
      <tr>
        <td>
          <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/techserve+logo.png" class="logo" style="position: absolute; top: 20px; left: 20px; width: 250px;" />
          <div class="header" style="color: #fff; justify-content: center; text-align: center; align-items: center; font-family: 'Inter', sans-serif; position: absolute;">
            <h1 style="margin-bottom: -10px; margin-top: -130px; margin-left: 100px;">Team are here!</h1>
            <p style="width: 400px; margin-left: 90px; font-size: 16px;">Today you are invited to start collaborating on your user insight</p>
          </div>
          <button class="b-button" style="width: 200px; height: 40px; background-color: #338bdf; border-radius: 50px; border: 1px solid white; text-align: center; font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; color: white; font-size: 16px; margin-top: -40px; margin-left: 200px;  position: absolute; z-index: 1; pointer-events: none;">Invite my team</button>
        </td>
      </tr>

      <!-- Middle Image Section -->
      <tr>
        <td class="back-midle" style="background-size: cover; background-position: center; background-repeat: no-repeat; position: relative; ">
          <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Group+1010108043.png" style="width: 595px; height:260px;" />
        </td>
      </tr>

      <!-- Additional Image Section -->
      <tr>
        <td align="center" class="ab-imge" style="position: absolute; top: 32%; left: 30%; transform: translate(-20%, -20%);">
          <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/amicodgfdg.png" style="width: 275px; margin-left: 55px;" />
        </td>
      </tr>

      <!-- Title Section -->
      <tr>
        <td class="b-wi" style="background: linear-gradient(to right, rgba(51, 141, 251, 0.5), rgba(255, 255, 255, 1));">
          <div><h2 class="grow-heading" style="margin-left: 10px; color: #074fa8; font-size: 18px; font-family: 'Inter', sans-serif;">COME GROW WITH US:</h2></div>
        </td>
      </tr>

      <!-- Services Block -->
      <tr class="background-top" style="background-color: #fff; width: 100%;">
        <td class="service-block" style="display: flex; justify-content: space-between;  background-color: rgba(190, 220, 253, 0.24); padding: 15px; margin: 0 auto; width: 90%; margin-top: 10px; margin-bottom: 10px;">
          <div  align="center" class="service-card" style="width: 24%; height: 130px; background-color: #ffffff; padding: 5px; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);  margin: 0;">
            <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/building+projection.png" alt="Build" style="width: 40px;" />
            <h3 style="margin: 5px 0; font-size: 16px;">Build</h3>
            <p style="margin: 0; font-size: 12px; width: 100px; line-height: 13px;  ">Alone we can do so little, together we can do so much.</p>
          </div>
          <div  align="center" class="service-card" style="width: 24%; height: 130px; background-color: #ffffff; padding: 5px; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);  margin: 0;">
            <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/growing+graph+icon.png" alt="Grow" style="width: 40px;" />
            <h3 style="margin: 5px 0; font-size: 16px;">Grow</h3>
            <p style="margin: 0; font-size: 12px; width: 120px; line-height: 13px;">Growth, in some curious way, depends on being always in motion.</p>
          </div>
          <div  align="center" class="service-card" style="width: 24%; height: 130px; background-color: #ffffff; padding: 5px; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);  margin: 0;">
            <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/monitor+with+small+text+on+the+screen.png" alt="Monitor" style="width: 40px;" />
            <h3 style="margin: 5px 0; font-size: 16px;">Monitor</h3>
            <p style="margin: 0; font-size: 12px; width: 100px; line-height: 13px;">From visionary leaders to creative minds.</p>
          </div>
          <div  align="center" class="service-card" style="width: 24%; height: 140px; background-color: #ffffff;  border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); margin: 0;">
            <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Medication+schedule+calendar.png" alt="Schedule" style="width:40px;" />
            <h3 style="margin: 5px 0; font-size: 16px;">Schedule</h3>
            <p style="margin: 0; font-size: 12px; width: 100px; ">Success seems to be connected with action.</p>
          </div>
        </td>
      </tr>

      <!-- Footer Section -->
      <tr>
        <td class="container" style="background-color: #338dfb; color: white; text-align: center; padding: 15px 20px; position: relative;">
          <p style="font-size: 12px;">support mail-hr@wishgeekstechserve.com</p>
          <p style="font-size: 12px;">Contact Us - <b>8700133076</b></p>
          <a href="#" style="font-size: 12px; color: #fff;">Unsubscribe</a>
        </td>
      </tr>
    </table>
  </body>
</html>



      `,
    title: "Select Template 2",
  },
 
  {
    id: 5,
    category: "OnBoarding",
    image: "https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/onboarding.png",

    html: `

   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome Card</title>
  </head>
  <body style="margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif;">
    <table style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
      <tr>
        <td>
          <div style="width: 400px; height: 1010px; background: url('https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Frame+1010107803hgyh.png') no-repeat center center; background-size: cover; padding: 30px; display: flex; align-items: center; flex-direction: column; justify-content: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); position: relative;">
            <!-- Logo positioned top-left -->
            <img class="logo" src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/techserve+logo.png" alt="Logo" style="position: absolute; top: 10px; left: 20px; width: 150px;" />

            <div style="position: relative; background: #f2efef; border-radius: 10px; width: 100%; min-height: 450px; margin-top: -170px; text-align: center; display: flex; flex-direction: column; align-items: center; border-radius: 70px;">
              <img class="main-image" src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/bro.png" alt="Welcome Image" style="width: 300px; height: auto; position: absolute; top: -85px; left: 53%; transform: translateX(-50%);" />
              <h2 style="color: #333; font-size: 22px; margin-top: 175px; margin-bottom: 10px; padding: 0px;">Welcome to the team</h2>
              <p style="color: #555; font-size: 12px; line-height: 18px; margin-bottom: 20px; text-align: center; width: 250px;">
                Starting a new job at a new company can be pretty stressful. It's a mixture of emotions, so we want to help ease those nerves!
              </p>

              <div style="display: flex; justify-content: space-between; width: 80%; margin-bottom: 20px;">
                <div style="text-align: center; width: 50%;">
                  <div style="background-color: #338dfb; border-radius: 10px; width: 60px; height: 60px; margin: 10px auto; display: flex; justify-content: center; align-items: center;">
                    <img align="center"
                      src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/Vector.png"
                      alt="Onboarding Kit"
                      style="width: 25px; "
                    />
                  </div>
                  <h3 style="font-size: 10px; color: #333;">Company Vision and mission</h3>
                  <p style="font-size: 10px; color: #555; margin-top: 5px; line-height: 13px;">Learn about our mission and values.</p>
                </div>
                <div style="text-align: center; width: 50%;">
                  <div style="background-color: #338dfb; border-radius: 10px; width: 60px; height: 60px; margin: 10px auto; display: flex; justify-content: center; align-items: center;">
                    <img align="center"
                      src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/Vector+(1).png"
                      alt="Onboarding Process"
                      style="width: 20px;"
                    />
                  </div>
                  <h3 style="font-size: 10px; color: #333;">Your Onboarding kits</h3>
                  <p style="font-size: 10px; color: #555; margin-top: 5px; line-height: 13px;">Get all the essential information.</p>
                </div>
                <div style="text-align: center; width: 50%;">
                  <div style="background-color: #338dfb; border-radius: 10px; width: 60px; height: 60px; margin: 10px auto; display: flex; justify-content: center; align-items: center;">
                    <img align="center"
                      src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/Group.png"
                      alt="Company Vision"
                      style="width: 25px;"
                    />
                  </div>
                  <h3 style="font-size: 10px; color: #333;">Onboarding Process</h3>
                  <p style="font-size: 10px; color: #555; margin-top: 5px; line-height: 13px;">Know about our timeline.</p>
                </div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 10%; position: relative;">
              <a href="https://wishgeekstechserve.com/" class="button" style="background-color: #338dfb; color: white; padding: 20px 50px; font-size: 24px; border: none; border-radius: 30px; cursor: pointer; text-decoration: none; display: inline-block; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
                <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/staRRR.png" class="top-left" style="position: absolute; width: 20px; height: 20px; top: -10px; left: -20px;" />
                Visit our site
                <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/staRRR.png" class="bottom-right" style="position: absolute; width: 20px; height: 20px; bottom: 0px; right: -20px;" />
              </a>
            </div>
          </div>

          <div style="background-color: white; width: 350px; display: flex; align-items: center; padding: 10px; border-top-left-radius: 70px; border-bottom-left-radius: 70px; color: #338dfb; overflow: hidden; margin-top: -248px; margin-bottom: -10%; position: absolute; height: 120px; margin-left: 20px;">
            <div>
              <p style="width: 150px; color: #338dfb; font-size: 10px; margin-top: 0px; margin-left: 40px;">By joining ultimate, you’ve got 50+ folks around you who form a really great support community.</p>

              <!-- Small icon version of the image -->
              <div style=" margin-top: -5px;">
                <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/staRRR.png" alt="Icon" style="width: 30px; height: 30px; object-fit: contain;" />
              </div>

              <p style="width: 150px; color: #338dfb; font-size: 10px; margin-left: 40px; margin-top: -10px;">
                Wish Geek Techserve post on fostering Inclusivity at Ultimate is a helpful reminder of how we can create a welcoming space.
              </p>
            </div>

            <div>
              <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/image+237.png" style="width: 170px; height: 150px;" />
            </div>
          </div>

          <div style="text-align: center; color: white; font-family: Arial, sans-serif; position: absolute; margin-top: -100px; margin-left: 70px;">
            <h2 style="font-size: 16px; font-weight: 400;">We can't wait to get to know you!</h2>
            <p style="font-size: 12px; margin-top: 10px;">support mail: hr@wishgeekstechserve.com</p>
            <p style="font-size: 12px; margin-top: 10px;">Contact Us: 8700133076</p>
            <a href="#" style="margin-bottom: 20px; color: white; font-size: 14px;">Unsubscribe</a>
          </div>
          
        </td>
      </tr>
    </table>
  </body>
</html>


      `,
    title: "Select Template 3 ",
  },
  {
    id: 6,
    category: "OnBoarding",
    image: "https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/onboarding.png",

    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Onboarding Email</title>
  </head>
  <body>
    <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">

      <!-- Header Section -->
      <tr>
        <td style="position: relative; text-align: center;">
          <img
            src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Group+1010108041.png"
            alt="Wish Geeks Techserve"
            style="width: 100%; height: auto; display: block;"
          />
          <img
            src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/techserve+logo.png"
            alt="Techserve Logo"
            style="width: 200px; position: absolute; top: 10px; left: 10px;"
          />
          <div style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
            <p style="color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px;">WELCOME ONBOARDING</p>
            <a href="#" style="background-color: white; color: #338dfb; padding: 9px 35px; text-decoration: none; font-size: 18px; border-radius: 30px; display: inline-block; font-weight: bold; ">Visit our site</a>
          </div>
        </td>
      </tr>

      <!-- Welcome Message -->
      <tr>
        <td style="text-align: center; font-size: 36px; font-weight: 700; color: #338dfb;">Welcome to the team</td>
      </tr>

      <!-- Three Column Section -->
      <tr>
        <td style="text-align: center; width: 100%; display: flex; justify-content: space-evenly; margin-top: 15px;">
          <table style="width: 100%; text-align: center;">
            <tr>
              <td style="padding: 0; width: 32%; text-align: center;">
                <div style="background-color: #338dfb; border-radius: 10px; width: 60px; height: 60px; margin: 10px auto; display: flex; justify-content: center; align-items: center;">
                  <img align="center"
                    src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/Vector.png"
                    alt="Onboarding Kit"
                    style="width: 25px; "
                  />
                </div>
                <h4 style="font-size: 14px; margin-top: 10px;">Your onboarding kits</h4>
                <p style="font-size: 12px; line-height: 15px; width: 150px; margin: 10px auto;">
                  Contains essential information about your job workflow and onboarding.
                </p>
              </td>
              <td style="padding: 0; width: 32%; text-align: center;">
                <div style="background-color: #338dfb; border-radius: 10px; width: 60px; height: 60px; margin: 10px auto; display: flex; justify-content: center; align-items: center;">
                  <img align="center"
                    src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/Vector+(1).png"
                    alt="Onboarding Process"
                    style="width: 20px;"
                  />
                </div>
                <h4 style="font-size: 14px; margin-top: 10px;">Onboarding Process</h4>
                <p style="font-size: 12px; line-height: 15px; width: 150px; margin: 10px auto;">
                  Access the infographic about the ultimate's onboarding process.
                </p>
              </td>
              <td style="padding: 0; width: 32%; text-align: center;">
                <div style="background-color: #338dfb; border-radius: 10px; width: 60px; height: 60px; margin: 10px auto; display: flex; justify-content: center; align-items: center;">
                  <img align="center"
                    src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/Group.png"
                    alt="Company Vision"
                    style="width: 25px;"
                  />
                </div>
                <h4 style="font-size: 14px; margin-top: 10px;">Company Vision & Mission</h4>
                <p style="font-size: 12px; line-height: 15px; width: 150px; margin: 10px auto;">
                  Get to know the company's vision, mission, and core values here.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      

      <!-- Exciting Message -->
      <tr>
        <td style="font-size: 20px; font-weight: bold; padding: 15px; display: flex; justify-content: center; align-items: center; gap: 10px;">
          <img
            src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/staRRR.png"
            alt="Star"
            style="width: 30px; height: auto;"
          />
          <span style="font-size: 24px; font-weight: 800;">We can’t wait to get to know you!</span>
          <img
            src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/staRRR.png"
            alt="Star"
            style="width: 30px; height: auto;"
          />
        </td>
      </tr>

      <!-- Message Section -->
      <tr>
        <td style="text-align: center; font-size: 16px; padding: 20px;">
          <p style="width: 90%; margin: auto; line-height: 25px;">
            Starting a new job at a new company can be pretty stressful. It’s a mixture of emotions, so we want to help ease those nerves!
          </p>
        </td>
      </tr>

      <!-- Illustration Section -->
      <!-- <tr>
        <td style="text-align: center; margin-top: 20px;">
          <img
            src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/amico+(1).png"
            alt="Onboarding Illustration"
            style="max-width: 50%; z-index: 999;"
          />
        </td>
      </tr> -->

      <!-- Footer -->
    <!-- Footer -->
    <tr>
      <td  align="center" style=" padding: 0;">
        <div>
          <img
            src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/amico+(1).png"
            alt="Footer Image"
            style="width: 35%; height: 200px; z-index: 999; margin-bottom: -20px;"
          />
        </div>
      </td>
    </tr>
    
    <tr>
      <td style="background-color: #338dfb; color: white; text-align: center; padding: 30px 20px 20px 20px;">
        <p style="margin: 0; font-size: 14px;">support mail-hr@wishgeekstechserve.com</p>
        <p style="margin: 0; font-size: 14px;">Contact Us - <b>8700133076</b></p>
        <a href="#" style="color: white; text-decoration: underline; font-weight: bold; font-size: 16px;">Unsubscribe</a>
      </td>
    </tr>
    
    </table>
  </body>
</html>


      `,
    title: "Select Template 3 ",
  },
  {
    id: 7,
    category: "Services",
    image: "https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/Desktop+-+53.png",

    html: `

  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wish Geeks Tech Service</title>
  </head>
  <body>
    <table
      style="
        width: 100%;
        max-width: 400px;
        height: 100%;
        position: relative;
        margin: 0 auto;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        overflow-x: hidden;
        overflow-y: hidden;
      "
    >
      <tr>
        <td>
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            width="500"
            align="center"
            style="background-color: #ffffff"
          >
            <!-- Header Section -->
            <tr>
              <td>
                <div
                  style="
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                  "
                >
                  <!-- Left Side: Image with Logo -->
                  <div style="flex: 1; position: relative; max-width: 100%">
                    <img
                      src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/6.png"
                      alt=""
                      style="width: 100%; height:auto"
                    />
                    <!-- Logo on top of the left image -->
                    <img
                      src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/techserve+logo.png"
                      style="
                        width: 220px;
                        position: absolute;
                        top: 10px;
                        left: 10px;
                      "
                      alt="Techserve Logo"
                    />
                  </div>

                  <!-- Right Side: Image with Text -->
                  <div style="flex: 1; position: relative">
                    <img
                      src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/7.png"
                      alt=""
                      style="width: 100%; height: auto; margin-top: 7%;"
                    />
                    <h1
                      style="
                        margin: 0;
                        font-size: 16px;
                        line-height: 1.2;
                        position: absolute;
                        top: 20%;
                        left: 40px;
                        color: white;
                        font-family:inter, sans-serif;
                      "
                    >
                      We're here to fix all your Tech Needs
                    </h1>
                  </div>
                </div>
              </td>
            </tr>

            <!-- About Us Section -->
            <tr>
              <td style="padding: 20px; position: absolute; margin-top: -150px;">
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <!-- Left Side: About Us Text -->
                  <div style="flex: 1; padding-right: 20px">
                    <h2 style="color: #000000; margin: 0; font-family:inter, sans-serif;">About Us:-</h2>
                    <p style="color: #666666; line-height: 1.5; font-family:inter, sans-serif;">
                      We provide expert solutions for a wide range of IT service
                      needs. From cameras and GPS systems to printers, routers,
                      WiFi networks, and support for computers and mobile
                      devices, our services ensure seamless performance for both
                      home and business environments.
                    </p>
                  </div>

                  <!-- Right Side: Image -->
                  <div style="flex: 1">
                    <img
                      src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Group+1010108044.png"
                      alt="About Us Image"
                      style="width: 100%; height: auto"
                    />
                  </div>
                </div>
              </td>
            </tr>

     <!-- Services Icons Section -->
     <tr>
      <td>
        <!-- Outer Border Div -->
        <table
          role="presentation"
          width="100%"
          style="
          
            border-radius: 10px;
            border-collapse: collapse;
            padding: 10px;
         margin-top: 140px;
          "
        >
          <!-- Title Row -->
          <tr>
            <td colspan="5" style="padding: 10px; text-align: center ;  ">
              <div style="position: relative; width: 700px; margin: 50px auto; padding: 20px; border: 2px solid rgb(208, 211, 212); border-radius: 10px; text-align: center; background-color: #fff;">
        
                <h2 style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background-color: #fff; padding: 0 10px; color: #007bff; margin: 0;">Our Services</h2>
             

        
         
    

          <!-- Service Items -->
          <table style="width: 100%; text-align: center; margin-top: 20px; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px;">
                    <div style="width: 100px; height: 100px; background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto;">
                        <img src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/2.png" alt="GPS" style="width: 50px; height: auto;">
                        <p style="margin-top: 8px; font-size: 14px; color: #333;  font-family:inter, sans-serif;">GPS</p>
                    </div>
                   
                </td>
                <td style="padding: 10px;">
                    <div style="width: 100px; height: 100px; background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: auto; flex-direction: column;">
                        <img src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/4.png" alt="Printer" style="width: 40px; height: auto;">
                        <p style="margin-top: 8px; font-size: 14px; color: #333;  font-family:inter, sans-serif;">Printer</p>
                    </div>
                   
                </td>
                <td style="padding: 10px;">
                    <div style="width: 100px; height: 100px; background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: auto; flex-direction: column;">
                        <img src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/5.png" alt="Alarm" style="width: 50px; height: auto;">
                    <p style="margin-top: 8px; font-size: 14px; color: #333;  font-family:inter, sans-serif;">Alarm</p>

                    </div>
                </td>
                <td style="padding: 10px;">
                    <div style="width: 100px; height: 100px; background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: auto; flex-direction: column;">
                        <img src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/1.png" alt="Computer" style="width: 50px; height: auto;">
                        <p style="margin-top: 8px; font-size: 14px; color: #333;  font-family:inter, sans-serif;">Computer</p>
                    </div>

                </td>
                <td style="padding: 10px;">
                    <div style="width: 100px; height: 100px; background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: auto; flex-direction: column;">
                        <img src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/9.png" alt="Router" style="width: 50px; height: auto;">
                        <p style="margin-top: 8px; font-size: 14px; color: #333;  font-family:inter, sans-serif;">Router</p>
                    </div>

                </td>
            </tr>
        </table>
        </div>
      </td>
    </tr>

            <!-- Features Section -->
            <tr>
              <td>
                <table role="presentation" width="100%"  style="margin-top: -30px;">
                  <tr>
                    <td
                      align="center"
                      style="
                    
                        display: flex;
                       
                        justify-content: center;
                        margin-top: -2px;
                      "
                    >
                      <span
                        style="
                          background-color: #4393f7;
                          color: white;
                          padding: 6px 14px;
                          border-radius: 20px;
                          margin-right: 10px;
                          margin-bottom: 10px;
                          margin-top: 10px;
                          font-family:inter, sans-serif;
                        "
                        >VPN</span
                      >
                      <span
                        style="
                          background-color: #4393f7;
                          color: white;
                          padding: 6px 12px;
                          border-radius: 20px;
                          margin-right: 10px;
                          margin-bottom: 10px;
                          margin-top: 10px;
                          font-family:inter, sans-serif;
                        "
                        >Antivirus</span
                      >
                      <span
                        style="
                          background-color: #4393f7;
                          color: white;
                          padding: 6px 12px;
                          border-radius: 20px;
                          margin-right: 10px;
                          margin-bottom: 10px;
                          margin-top: 10px;
                          font-family:inter, sans-serif;
                        "
                        >Unlimited Support</span
                      >
                      <span
                        style="
                          background-color: #4393f7;
                          color: white;
                          padding: 6px 12px;
                          border-radius: 20px;
                          margin-right: 10px;
                          margin-bottom: 10px;
                          margin-top: 10px;
                          font-family:inter, sans-serif;
                        "
                        >Dedicated Experts</span
                      >
                      <span
                        style="
                          background-color: #4393f7;
                          color:white;
                          padding: 6px 12px;
                          border-radius: 20px;
                          margin-right: 10px;
                          margin-bottom: 10px;
                          margin-top: 10px;
                          font-family:inter, sans-serif;
                        "
                        >Discounted Services</span
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
<table style="margin-top: -20px;">
            <tr>
              <td style="padding: 20px" >
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                  "
                >
                  <!-- Added gap between the divs -->
                  <!-- CTA Section -->
                  <div
                    style="
                      flex: 1;
                      background-color: #f5f9ff;
                      text-align: center;
                      padding: 0px;
                      display: flex;
                      flex-direction: row;
                      gap: 10px;
                    "
                  >
                    <!-- Added gap between p and a tags -->
                    <p
                      style="
                        font-weight: bold;
                        width: 150px;
                        font-size: 14px;
                        margin-left: 10px;
                        text-align: left;
                        font-family:inter, sans-serif;
                      "
                    >
                      Tired of paying high charges for fixation to your
                      technician
                    </p>
                    <a
                      href="#"
                      style="
                        background-color: #4393f7;
                        color: white;
                        padding: 10px;
                        text-decoration: none;
                        height: 40px;
                        margin-top: 20px;
                        margin-right: 20px;
                        width: 150px;
                        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                        font-family:inter, sans-serif;
                      "
                      >Try Our Services</a
                    >
                    <!-- Added box-shadow for shadow effect -->
                  </div>
                  <!-- Pricing Section -->
                  <div
                    style="
                      flex: 1;
                      background-color: #f5f9ff;
                      text-align: center;
                      padding: 0px;
                      gap: 10px;
                      height: 80px;
                      width: 320px;
                    "
                  >
                    <!-- Added gap between p and a tags -->
                    <p
                      style="
                        color: #156cd6;
                        font-size: 12px;
                        font-weight: bold;
                        margin-top: 20px;
                        margin-right: 10px;
                        text-align: right;
                        font-family:inter, sans-serif;
                      "
                    >
                      Avail the Services starting from $9.99 Monthly Get 10%
                      Discount with membership includes
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </table>
            <tr>
              <td>
                <div
                  style="
                    width: 100%;
                    background-color: #156cd6;
                    height: 2px;
                    margin-top: -5px;
                  "
                ></div>
              </td>
            </tr>

            <!-- Footer Section -->
            <tr>
              <td
                style="background-color: #4393f7; color: white; height: 100px; text-align: center;"
              >
                <p style="line-height: 3px; font-family: inter, sans-serif;">
                  support mail-hr@wishgeekstechserve.com
                </p>
                <p style="line-height: 3px; font-family: inter, sans-serif;">
                  Contact Us-8700133076
                </p>
                <p style="line-height: 3px; font-family: inter, sans-serif;">
                  <a
                    href="#"
                    style="color: white; text-decoration: underline; font-family: inter, sans-serif;"
                  >
                    Unsubscribe
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>



      `,
    title: "Select Template 4 ",
  },
  {
    id: 8,
    category: "Services",
    image: "https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/Desktop+-+53.png",

    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wish Geeks Tech Service</title>
  </head>
  <body >
    <table
      style="width: 100%; max-width: 500px; height: 100%; position: relative; margin: 0 auto;padding: 0;  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); overflow-x: hidden; overflow-y: hidden; overflow-x: hidden;"
    >
      <tr>
        <td>
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            align="center"
            style="background-color: #fff; width: 100%;"
          >
            <!-- Header Section -->
            <tr>
              <td>
                <div
                  style="position: relative; display: flex; flex-direction: row; gap: 10px; max-width: 100%;"
                >
                  <!-- Left Side: Image with Logo -->
                  <div style="flex: 1; position: relative; max-width: 100%">
                    <img
                      src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/background+image+header.png"
                      alt=""
                      style="width: 95%; height:auto; max-width: 100%;"
                    />
                    <!-- Logo on top of the left image -->
                    <img
                      src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/techserve+logo.png"
                      style="width: 150px; position: absolute; top: 10px; left: 5px;"
                      alt="Techserve Logo"
                    />
                  </div>

                  <!-- Right Side: Image with Text -->
                  <div style="flex: 1; position: relative; max-width: 100%">
                    <img
                      src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/7.png"
                      alt=""
                      style="width: 100%; height: auto; margin-top: 7%; max-width: 100%;"
                    />
                    <h1
                      style="margin: 0; font-size: 16px; line-height: 1.2; position: absolute; top: 20%; left: 40px; color: white; font-family: inter, sans-serif;"
                    >
                      We're here to fix all your Tech Needs
                    </h1>
                  </div>
                </div>
              </td>
            </tr>

            <!-- About Us Section -->
            <tr>
              <td style="padding: 20px; position: absolute; margin-top: -100px;">
                <div
                  style="display: flex; justify-content: space-between; align-items: center; max-width: 100%;"
                >
                  <div style="flex: 1">
                    <img
                      src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/Group+1010108067.png"
                      alt="About Us Image"
                      style="width: 100%; height: auto; max-width: 100%;"
                    />
                  </div>
                  <!-- Left Side: About Us Text -->
                  <div style="flex: 1;">
                    <h2 style="color: #f7f2f2; margin-left: 25px; font-size: 18px; font-family: inter, sans-serif;">
                      About Us:
                    </h2>
                    <p style="color: #666666; line-height: 1.5; font-family: inter, sans-serif;">
                      We provide expert solutions for a wide range of IT service needs.
                      From cameras and GPS systems to printers, routers, WiFi networks,
                      and support for computers and mobile devices, our services ensure
                      seamless performance for both home and business environments.
                    </p>
                  </div>
                </div>

                   <!-- Below Section (text centered) -->
                   <div
                   style="
                     background-color: #f5f9ff;
                     text-align: center; /* Centering content inside the div */
                     height: 80px;
                     padding: 10px;
                     width: 47%;
                     margin-left: 350px;
                     margin-top: -50px; /* Adds space between the two sections */
                   "
                 >
                   <p
                     style="
                       color: #156cd6;
                       font-size: 15px;
                       font-weight: bold;
                     
                       margin: 0 auto;
                       text-align: center;
                       font-family: inter, sans-serif;
                       padding: 2px;
                       text-align: right;
                     "
                   >
                     Avail the Services starting from $9.99 Monthly. Get 10%
                     Discount with membership includes.
                   </p>
                 </div>
              </td>
            </tr>

            <!-- Services Icons Section -->
            <tr>
              <td>
                <table
                  role="presentation"
                  width="100%"
                  style="border-radius: 10px; margin-top: 200px; width: 100%;"
                >
                  <!-- Main content row with 60% for cards and 40% for image -->
                  <tr>
                    <td
                      style="width: 60%;  padding: 10px;"
                    >
                      <!-- <h2
                        style="color: #4393f7; font-family: inter, sans-serif; text-align: center; font-size: 20px;"
                      >
                        Our Services
                      </h2> -->
                      <div style="position: relative; width: 400px; margin: 50px auto; padding: 20px; border: 2px solid rgb(208, 211, 212); border-radius: 10px; text-align: center; background-color: #fff;">
        
                        <h2 style="position: absolute; top: -15px; left: 50%; font-size: 18px;  transform: translateX(-50%); background-color: #fff; padding: 0 10px; color: #007bff; margin: 0;">Our Services</h2>
                      <div
                        style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px;"
                      >
                        <!-- Service Card 1 -->
                        <div
                          style="width: 30%; box-sizing: border-box; max-width: 30%;"
                        >
                          <div
                            style="width: 100%; height: 120px;  background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto;"
                          >
                            <img
                              src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/cuate+(1).png"
                              alt="GPS"
                              style="width: 60px; height: auto;  margin-top: 30px;"
                            />
                            <p
                              style="margin-top: 8px; font-size: 14px; color: #333; font-family: inter, sans-serif;"
                            >
                            Web App Developmemnt
                            </p>
                          </div>
                        </div>

                        <!-- Service Card 2 -->
                        <div
                          style="width: 30%; box-sizing: border-box; max-width: 30%;"
                        >
                          <div
                            style="width: 100%; height: 120px;  background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto;"
                          >
                            <img
                              src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/amico.png"
                              alt="Printer"
                              style="width: 60px; height: auto;  margin-top: 30px;"
                            />
                            <p
                              style="font-size: 14px; color: #333; font-family: inter, sans-serif;"
                            >
                              Email Marketing
                            </p>
                          </div>
                        </div>

                        <!-- Service Card 3 -->
                        <div
                          style="width: 30%; box-sizing: border-box; max-width: 30%;"
                        >
                          <div
                            style="width: 100%;height: 120px;  background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto;"
                          >
                            <img
                              src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/cuate+(2).png"
                              alt="Alarm"
                              style="width: 60px; height: auto;  margin-top: 30px;"
                            />
                            <p
                              style="margin-top: 4px; font-size: 14px; color: #333; font-family: inter, sans-serif;"
                            >
                            Social Media Marketing
                            </p>
                          </div>
                        </div>

                        <!-- Service Card 4 -->
                        <div
                          style="width: 30%; box-sizing: border-box; max-width: 30%;"
                        >
                          <div
                            style="width: 100%; height: 120px;  background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto;"
                          >
                            <img
                              src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/rafiki+(1).png"
                              alt="Computer"
                              style="width: 60px; height: auto;  margin-top: 30px;"
                            />
                            <p
                              style="margin-top: 8px; font-size: 14px; color: #333; font-family: inter, sans-serif;"
                            >
                            UI/UX Design
                            </p>
                          </div>
                        </div>
                           <!-- Service Card 5 -->
                           <div
                           style="width: 30%; box-sizing: border-box; max-width: 30%;"
                         >
                           <div
                             style="width: 100%; height: 120px;  background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto;"
                           >
                             <img
                               src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/cuate.png"
                               alt="Computer"
                               style="width: 60px; height: auto;  margin-top: 30px;"
                             />
                             <p
                               style=" margin-bottom: 20px; font-size: 14px; color: #333; font-family: inter, sans-serif;"
                             >
                             Mobile Application
                             </p>
                           </div>
                         </div>
                            <!-- Service Card 6 -->
                        <div
                        style="width: 30%; box-sizing: border-box; max-width: 30%; "
                      >
                        <div
                          style="width: 100%; height: 120px; background-color: #eef2ff; border: 2px solid #b5c7f0; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto;"
                        >
                          <img
                            src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/assests+for+Email+Automation/rafiki.png"
                            alt="Computer"
                            style="width: 60px; height: auto;  margin-top: 30px;"
                          />
                          <p
                            style=" font-size: 14px; color: #333; font-family: inter, sans-serif;"
                          >
                          SEO Optimization
                          </p>
                        </div>
                      </div>
                      </div>
                      </div>
                    </td>

                    <!-- Image Section 40% width -->
                    <td style="width: 40%; padding: 10px;">
                      <img
                        src="https://wishgeekstechserve.s3.ap-southeast-2.amazonaws.com/3.png"
                        alt="Services Image"
                        style="width: 100%; height: auto; border-radius: 8px;"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <table role="presentation" width="100%" style="margin-top: 0px;">
                  <tr>
                    <td
                      align="center"
                      style="display: flex; justify-content: center; margin-top: -2px;"
                    >
                      <span
                        style="background-color: #4393f7; color: white; padding: 8px 16px; border-radius: 5px; margin-right: 10px; margin-bottom: 10px; margin-top: 10px; font-family: inter, sans-serif; white-space: nowrap;"
                      >
                        VPN
                      </span>
                      <span
                        style="background-color: #4393f7; color: white; padding: 8px 16px; border-radius: 5px; margin-right: 10px; margin-bottom: 10px; margin-top: 10px; font-family: inter, sans-serif; white-space: nowrap;"
                      >
                        Antivirus
                      </span>
                      <span
                        style="background-color: #4393f7; color: white; padding: 8px 16px; border-radius: 5px; margin-right: 10px; margin-bottom: 10px; margin-top: 10px; font-family: inter, sans-serif; white-space: nowrap;"
                      >
                        Unlimited Support
                      </span>
                      <span
                        style="background-color: #4393f7; color: white; padding: 8px 16px; border-radius: 5px; margin-right: 10px; margin-bottom: 10px; margin-top: 10px; font-family: inter, sans-serif; white-space: nowrap;"
                      >
                        Dedicated Experts
                      </span>
                      <span
                        style="background-color: #4393f7; color: white; padding: 8px 16px; border-radius: 5px; margin-right: 10px; margin-bottom: 10px; margin-top: 10px; font-family: inter, sans-serif; white-space: nowrap;"
                      >
                        Discounted Services
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <div
                  style="width: 100%; background-color: #156cd6; height: 2px; margin-top: -5px;"
                ></div>
              </td>
            </tr>

            <tr>
              <td
                style="background-color: #4393f7; color: white; height: 100px; text-align: center;"
              >
                <p style="line-height: 3px; font-family: inter, sans-serif;">
                  support mail-hr@wishgeekstechserve.com
                </p>
                <p style="line-height: 3px; font-family: inter, sans-serif;">
                  Contact Us-8700133076
                </p>
                <p style="line-height: 3px; font-family: inter, sans-serif;">
                  <a
                    href="#"
                    style="color: white; text-decoration: underline; font-family: inter, sans-serif;"
                  >
                    Unsubscribe
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>




      `,
    title: "Select Template 4",
  },
];
