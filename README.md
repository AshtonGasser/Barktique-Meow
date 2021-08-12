# Barktique + Meow

## Description
_Duration: 2 Week Sprint_

This application contains three parts: Customer landing page, Artist order queue, and an Admin overview.

On the customer landing page, the customer is required to fill in all inputs marked as required. The customer then needs to upload an image. When the image is uploaded it is processed to validate that it meets the standards for laser etching. If the image fails, then the customer is alerted along with the ability to select another image. When the image passes, the customer has the option to put down any notes (ie. please select the pet on the right). The customer then needs to mark that they own the rights to the image being uploaded. If this step gets missed, on submit an alert will prompt reminding the customer to select that checkbox. The option is also given to allow Barktique + Meow to use the photo on company website and social media.

The Artist and Admin login page redirects the user based on access level set by the Admin. The Artist will be directed to the order processing queue. On this view, the artist can start, process, and complete orders. They also have the option to mark image issues if customers don't provide notes and the chosen pet is unclear. The artist has the customer information displayed on top to allow quick contact for clarification. The order also gets flagged in the Admin view.

The Admin upon login is directed to a view with three tabs to navigate. The orders tab displays all orders in real time status. Admin can click on order number to view the entire order details. A drop down can be clicked for quick access without leaving the admin page. The issues tab displays any orders that have been in the queue for more than 5 days and not started. If an artist selects image issue, it will also be displayed in this tab. A drop down for quick access to customer details is provided. The artist tab displays all current artist and admins. In this view the admin can edit employee details as needed. If an employee needs to be deleted, a delete button is also shown with an alert to verify this action is correct. 


## Application GIF

#### Customer Landing Page

![](customer-frontend.gif)
#### Employee and Admin Landing Page

![](employee-frontend.gif)
### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Postico](https://eggerapps.at/postico/)
- PostgreSQL

## Installation

1. Fork and clone project
2. Open with the editor of your choice
3. Create a database through Postico called `barktique_meow`
4. Data to setup table found in `database.sql` file
5. Open terminal and run `brew services start postgresql`
6. Run `npm install` to get dependencies for `package.json`
7. Split terminal window
8. `npm run server`
9. `npm run client`
10. Browser will load and direct to `http://localhost:3000`
11. When finished in each terminal window press `control + C` to stop server and client
12. Stop postgresql in terminal with `brew services stop postgresql`

## Built With

- React
- Redux
- Redux-Saga
- AWS-S3
- Moment.js
- Nodemailer
- Express.js
- PostgreSQL
- Passport
- JavaScript
- Material-UI
- HTML
- CSS

## Acknowledgment

Thanks to Prime Digital Academy who equipped and helped make this application a reality.