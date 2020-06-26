<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$route->addGroup('/', function ($route) {

    $route->addRoute("GET", "", [\App\Http\Controllers\AuthController::class, "index"]);
    $route->addRoute("POST", "", [\App\Http\Controllers\AuthController::class, "index"]);
    $route->addRoute("GET", "dashboard", [\App\Http\Controllers\AuthController::class, "dashboard"]);
    $route->addRoute("GET", "logout", [\App\Http\Controllers\AuthController::class, "logout"]);


    // Domaine
    $route->addRoute("GET", "domain/whois", [\App\Http\Controllers\UtilsController::class, "domain"]);
    $route->addRoute("POST", "domain/whois/ask", [\App\Http\Controllers\UtilsController::class, "domainask"]);

   // Server
    $route->addRoute("GET", "server-info", [\App\Http\Controllers\UtilsController::class, "serverinfo"]);
    $route->addRoute("GET", "server-get-ftp-{id}", [\App\Http\Controllers\UtilsController::class, "getftp"]);
    $route->addRoute("GET", "server-get-db-{id}", [\App\Http\Controllers\UtilsController::class, "getdb"]);
    $route->addRoute("GET", "delete-server-{id}", [\App\Http\Controllers\UtilsController::class, "deleteserver"]);
    $route->addRoute("POST", "server-ftp-connect", [\App\Http\Controllers\UtilsController::class, "connectintoftp"]);



    // Database
    $route->addRoute("GET", "backup-database", [\App\Http\Controllers\DatabaseController::class, "index"]);
    $route->addRoute("GET", "dump-database", [\App\Http\Controllers\DatabaseController::class, "dump"]);
    $route->addRoute("GET", "download-database/{hash_key}", [\App\Http\Controllers\DatabaseController::class, "download"]);
    $route->addRoute("GET", "delete-database/{hash_key}", [\App\Http\Controllers\DatabaseController::class, "deletedatabase"]);



    // Invoice
    $route->addRoute("GET", "liste-facture", [\App\Http\Controllers\InvoiceController::class, "index"]);
    $route->addRoute("GET", "invoice-detail-{hash}", [\App\Http\Controllers\InvoiceController::class, "detail"]);
    $route->addRoute("POST", "invoice-item-add", [\App\Http\Controllers\InvoiceController::class, "additem"]);
    $route->addRoute("POST", "invoice-add", [\App\Http\Controllers\InvoiceController::class, "addinv"]);



    // Projet
    $route->addRoute("GET", "ajouter-projet", [\App\Http\Controllers\ProjetsController::class, "add"]);
    $route->addRoute("POST", "projet-file-add", [\App\Http\Controllers\ProjetsController::class, "addfiles"]);
    $route->addRoute("GET", "projet-liste", [\App\Http\Controllers\ProjetsController::class, "liste"]);
    $route->addRoute("POST", "projet-add", [\App\Http\Controllers\ProjetsController::class, "addprojet"]);
    $route->addRoute("GET", "projet-detail-{hash}", [\App\Http\Controllers\ProjetsController::class, "detailprojet"]);
    $route->addRoute("POST", "projet-add-team", [\App\Http\Controllers\ProjetsController::class, "addteam"]);
    $route->addRoute("POST", "projet-add-task", [\App\Http\Controllers\ProjetsController::class, "addtask"]);
    $route->addRoute("GET", "projet-team-task-delete-{id}-{task}", [\App\Http\Controllers\ProjetsController::class, "deleteprojetteamtask"]);
    $route->addRoute("POST", "projet-add-file", [\App\Http\Controllers\ProjetsController::class, "detailfileadd"]);
    $route->addRoute("POST", "projet-assign-customer", [\App\Http\Controllers\ProjetsController::class, "customeradd"]);
    $route->addRoute("GET", "projet-start-{id}-{action}", [\App\Http\Controllers\ProjetsController::class, "projetstart"]);
    $route->addRoute("GET", "delete-projet/{id}", [\App\Http\Controllers\ProjetsController::class, "deleteprojet"]);


    // SMS
    $route->addRoute("GET", "send-message-sms", [\App\Http\Controllers\SMSController::class, "index"]);
    $route->addRoute("POST", "send-multiple-sms", [\App\Http\Controllers\SMSController::class, "multiple"]);
    $route->addRoute("POST", "send-single-sms", [\App\Http\Controllers\SMSController::class, "single"]);

    // Account
    $route->addRoute("GET", "account-profil", [\App\Http\Controllers\UserController::class, "profil"]);
    $route->addRoute("POST", "account-profil-picture", [\App\Http\Controllers\UserController::class, "updateprofil"]);
    $route->addRoute("GET", "ecran-de-verouillage", [\App\Http\Controllers\UserController::class, "lockscreen"]);
    $route->addRoute("POST", "ecran-de-verouillage", [\App\Http\Controllers\UserController::class, "lockscreen"]);
    $route->addRoute("GET", "unlocktosignin", [\App\Http\Controllers\UserController::class, "unlocktosignin"]);


    // Paiement
    $route->addRoute("GET", "paiement", [\App\Http\Controllers\PaymentController::class, "index"]);
    $route->addRoute("POST", "paiement-check", [\App\Http\Controllers\PaymentController::class, "checkpassword"]);
    $route->addRoute("GET", "paiement-otp-security", [\App\Http\Controllers\PaymentController::class, "mailcheckotp"]);
    $route->addRoute("POST", "paiement-otp-security", [\App\Http\Controllers\PaymentController::class, "mailcheckotp"]);
    $route->addRoute("GET", "sendmailforotp-{random}", [\App\Http\Controllers\PaymentController::class, "sendmailforotp"]);
    $route->addRoute("GET", "payment-operation", [\App\Http\Controllers\PaymentController::class, "paymentlist"]);
    $route->addRoute("POST", "operation-account-add", [\App\Http\Controllers\PaymentController::class, "accountAdd"]);
    $route->addRoute("POST", "operation-transaction-add", [\App\Http\Controllers\PaymentController::class, "transactionAdd"]);
    $route->addRoute("POST", "operation-budget-add", [\App\Http\Controllers\PaymentController::class, "budgetAdd"]);
    $route->addRoute("POST", "operation-depot-add", [\App\Http\Controllers\PaymentController::class, "depotAdd"]);


    // Contact
    $route->addRoute("GET", "customers", [\App\Http\Controllers\ContactController::class, "customers"]);
    $route->addRoute("POST", "customer-add", [\App\Http\Controllers\ContactController::class, "customeradd"]);
    $route->addRoute("GET", "delete-customer/{id}", [\App\Http\Controllers\ContactController::class, "deletecustomer"]);
    $route->addRoute("POST", "customer-update", [\App\Http\Controllers\ContactController::class, "Updatecustomer"]);
    $route->addRoute("GET", "partenaires", [\App\Http\Controllers\ContactController::class, "partenaires"]);
    $route->addRoute("GET", "partenaire-action-{id}-{type}", [\App\Http\Controllers\ContactController::class, "actionpartenaire"]);
    $route->addRoute("POST", "partenaire-add", [\App\Http\Controllers\ContactController::class, "addpartenaire"]);


    // Profil User
    $route->addRoute("GET", "ajouter-profil", [\App\Http\Controllers\ProfilController::class, "add"]);
    $route->addRoute("POST", "profil-add", [\App\Http\Controllers\ProfilController::class, "addprofil"]);
    $route->addRoute("GET", "liste-profil", [\App\Http\Controllers\ProfilController::class, "liste"]);




    // Parametre
    $route->addRoute("GET", "parametre", [\App\Http\Controllers\ParamsController::class, "index"]);
    $route->addRoute("GET", "parameter-api-{id}-{number}", [\App\Http\Controllers\ParamsController::class, "updateapi"]);
    $route->addRoute("POST", "parameter-add-method", [\App\Http\Controllers\ParamsController::class, "addmethod"]);
    $route->addRoute("POST", "parameter-add-devise", [\App\Http\Controllers\ParamsController::class, "addDevise"]);
    $route->addRoute("POST", "parameter-add-api", [\App\Http\Controllers\ParamsController::class, "addApi"]);

    $route->addRoute("GET", "params-method-action-{id}-{type}", [\App\Http\Controllers\ParamsController::class, "actionmethod"]);
    $route->addRoute("GET", "params-devise-action-{id}-{type}", [\App\Http\Controllers\ParamsController::class, "actiondevise"]);
    $route->addRoute("GET", "params-modality-action-{id}-{type}", [\App\Http\Controllers\ParamsController::class, "actionmodality"]);
    $route->addRoute("POST", "params-logo-add", [\App\Http\Controllers\ParamsController::class, "addlogo"]);
    $route->addRoute("POST", "parameter-info", [\App\Http\Controllers\ParamsController::class, "addInfo"]);
    $route->addRoute("POST", "parameter-info-terms", [\App\Http\Controllers\ParamsController::class, "addInfoTerms"]);

    $route->addRoute("GET", "install-db-create", [\App\Http\Controllers\InstallController::class, "CreateDatabase"]);



    // Developer
    $route->addRoute("GET", "manage-access-token", [\App\Http\Controllers\DevController::class, "token"]);
    $route->addRoute("POST", "generate-clientId", [\App\Http\Controllers\DevController::class, "clientID"]);
    $route->addRoute("POST", "token-generator", [\App\Http\Controllers\DevController::class, "tokencreate"]);




    // Gestion
        $route->addRoute("GET", "packages", [\App\Http\Controllers\GestionController::class, "packages"]);
        $route->addRoute("POST", "package-add-item", [\App\Http\Controllers\GestionController::class, "addItem"]);
        $route->addRoute("GET", "package-item-delete-{id}", [\App\Http\Controllers\GestionController::class, "delItem"]);
        $route->addRoute("POST", "add-package", [\App\Http\Controllers\GestionController::class, "addPackage"]);
        $route->addRoute("POST", "update-package", [\App\Http\Controllers\GestionController::class, "UpdatePackage"]);
        $route->addRoute("GET", "package-delete-{id}", [\App\Http\Controllers\GestionController::class, "delPackage"]);
        $route->addRoute("GET", "package-get-to-update-{id}", [\App\Http\Controllers\GestionController::class, "getToPackage"]);
        $route->addRoute("GET", "site-web", [\App\Http\Controllers\GestionController::class, "siteweb"]);
        $route->addRoute("GET", "mon-portfolio-about", [\App\Http\Controllers\GestionController::class, "portfolioAbout"]);
        $route->addRoute("GET", "add-about-info", [\App\Http\Controllers\GestionController::class, "addAboutInfo"]);
        $route->addRoute("POST", "update-about-info", [\App\Http\Controllers\GestionController::class, "UpdateAboutInfo"]);
        $route->addRoute("POST", "portfolio-about-picture", [\App\Http\Controllers\GestionController::class, "UpdateAboutPicture"]);
        $route->addRoute("GET", "porfolio-eduform-delete-{id}", [\App\Http\Controllers\GestionController::class, "DeleteEduForm"]);
        $route->addRoute("GET", "portfolio-eduform-info-{id}", [\App\Http\Controllers\GestionController::class, "EduformInfo"]);
        $route->addRoute("POST", "add-about-skill", [\App\Http\Controllers\GestionController::class, "addAboutSkill"]);
        $route->addRoute("POST", "add-about-exp-edu", [\App\Http\Controllers\GestionController::class, "addAboutAction"]);
        $route->addRoute("POST", "update-about-exp-edu", [\App\Http\Controllers\GestionController::class, "EditAboutAction"]);
        $route->addRoute("GET", "mon-portfolio-contact", [\App\Http\Controllers\GestionController::class, "portfolioContact"]);
        $route->addRoute("GET", "see-message-{id}", [\App\Http\Controllers\GestionController::class, "portfolioContactDetail"]);
        $route->addRoute("GET", "porfolio-message-delete-{id}", [\App\Http\Controllers\GestionController::class, "portfolioContactDelete"]);
        $route->addRoute("GET", "mon-portfolio-portfolio", [\App\Http\Controllers\GestionController::class, "portfolioPortfolio"]);
        $route->addRoute("POST", "add-portfolio", [\App\Http\Controllers\GestionController::class, "portfolioAdd"]);

        $route->addRoute("GET", "mon-portfolio-blog", [\App\Http\Controllers\GestionController::class, "portfolioBlog"]);
        $route->addRoute("POST", "portfolio-add-article", [\App\Http\Controllers\GestionController::class, "AddportfolioArticle"]);
        $route->addRoute("GET", "portfolio-blog-{id}-{type}", [\App\Http\Controllers\GestionController::class, "portfolioArticleAction"]);

        $route->addRoute("GET", "mon-portfolio-home", [\App\Http\Controllers\GestionController::class, "portfolioHome"]);
        $route->addRoute("POST", "portfolio-file-home", [\App\Http\Controllers\GestionController::class, "portfolioHomeFile"]);
        $route->addRoute("POST", "portfolio-home-add-titles", [\App\Http\Controllers\GestionController::class, "portfolioHomeTitles"]);
        $route->addRoute("POST", "portfolio-home-add-description", [\App\Http\Controllers\GestionController::class, "portfolioHomeDescription"]);


        // Users
        $route->addRoute("POST", "add-user", [\App\Http\Controllers\UserController::class, "addUser"]);
        $route->addRoute("GET", "users-liste", [\App\Http\Controllers\UserController::class, "viewUsers"]);
        $route->addRoute("GET", "user-action-{id}-{type}", [\App\Http\Controllers\UserController::class, "actionUser"]);
        $route->addRoute("GET", "user-detail/{hash}", [\App\Http\Controllers\UserController::class, "detailUser"]);





        //Social
        $route->addRoute("GET", "reseaux-sociaux", [\App\Http\Controllers\ContactController::class, "reseauxSociaux"]);
        $route->addRoute("GET", "delete-social-{id}", [\App\Http\Controllers\ContactController::class, "delSocial"]);
        $route->addRoute("POST", "reseau-create", [\App\Http\Controllers\ContactController::class, "addSocial"]);




});

