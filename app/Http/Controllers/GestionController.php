<?php

namespace App\Http\Controllers;


use Akuren\Auth\Auth;
use Akuren\File\UploadFiles\Files;
use Akuren\File\UploadPicture\Picture;
use App\Http\Handlers\Utils;
use App\Models\Customer;
use App\Models\Package;
use App\Models\PackageItem;
use App\Models\PortfolioAbout;
use App\Models\PortfolioBlog;
use App\Models\PortfolioContact;
use App\Models\PortfolioEduExp;
use App\Models\PortfolioHome;
use App\Models\PortfolioPortfolio;
use App\Models\PortfolioSkill;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class GestionController extends Controller
{

    public function packages()
    {
        $items = PackageItem::all();
        $packages = Package::all();
        return View::render("gestion.package",compact('packages',"items"));
    }

    public function addItem(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
         $id = $params['id'];
         $item = $params['item'];

         $data = [
             'item' => $item,
             'package_id' => $id
         ];

         if (PackageItem::create($data)){
             echo "true";
         }else{
             echo "false";
         }
         die;

    }


    public function delItem(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        if (PackageItem::where(['pk_item_id' => $id])->delete()){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }

    public function DeleteEduForm(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        if (PortfolioEduExp::where(['id_edu' => $id])->delete()){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }
    public function EduformInfo(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        $content = PortfolioEduExp::where(['id_edu' => $id])->first();
         echo json_encode($content);
        die;
    }

 public function delPackage(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        if (Package::where(['pk_id' => $id])->delete()){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }

    public function getToPackage(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        $pack = Package::where(['pk_id' => $id])->first();

        $data = [
            'name' => $pack['pk_name'],
            'desc' => $pack['pk_description'],
            'price' => $pack['pk_price'],
            'icon' => $pack['pk_icon'],
        ];
        echo json_encode($data);
        die;
    }


    public function addPackage(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $title = $params['title'];
        $amount = $params['amount'];
        $desc = $params['desc'];
        $icon = $params['icon'];

        $data = [
            'pk_name' => $title,
            'pk_price' => $amount,
            'pk_description' => $desc,
            'pk_icon' => $icon
        ];

        if (Package::create($data)){
            echo "true";
        }else{
            echo "false";
        }
        die;

    }


    public function UpdatePackage(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $title = $params['title'];
        $amount = $params['amount'];
        $desc = $params['desc'];
        $icon = $params['icon'];
        $id = $params['id'];

        $data = [
            'pk_name' => $title,
            'pk_price' => $amount,
            'pk_description' => $desc,
            'pk_icon' => $icon
        ];

        if (Package::where(['pk_id' => $id])->update($data)){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }


    public function siteweb()
    {
        return View::render('gestion.siteweb');
    }


    public function portfolioAbout()
    {
        $about = PortfolioAbout::where(['user_id' => Auth::user()->id])->first();
        $skills = PortfolioSkill::where(['user_id' => Auth::user()->id])->get();
        $edu = PortfolioEduExp::where(['user_id' => Auth::user()->id, "type" => 1])->get();
        $exp= PortfolioEduExp::where(['user_id' => Auth::user()->id, "type" => 2])->get();
        return View::render('gestion.portfolio.about',compact("about","skills","edu","exp"));
    }

    public function addAboutInfo()
    {
        $data =  [
          'firstname' => Auth::user()->firstname,
          'lastname' =>Auth::user()->lastname,
          'email' =>Auth::user()->email,
          'telephone' =>Auth::user()->telephone,
          'address' =>Auth::user()->adresse,
          'user_id' =>Auth::user()->id,
        ];
        if (PortfolioAbout::create($data)){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }
    public function UpdateAboutInfo(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);

        $data =  [
            'firstname' => $params['firstname'],
            'lastname' =>$params['lastname'],
            'email' =>$params['email'],
            'telephone' =>$params['telephone'],
            'address' =>$params['address'],
            'freelance' => $params['freelance'],
            'experience' =>$params['experience'],
            'langue' =>$params['langue'],
            'skype' =>$params['skype'],
            'github' =>$params['github'],
            'linkedin' =>$params['linkedin'],
            'xing' =>$params['xing'],
        ];
        if (PortfolioAbout::where(['id_about' =>$params['id'] ])->update($data)){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }

    public function addAboutSkill(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);

        $data =  [
          'designation' => $params['name'],
          'percent' => $params['percent'],
          'user_id' =>Auth::user()->id,
        ];
        if (PortfolioSkill::create($data)){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }

    public function addAboutAction(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);

        $data =  [
          'titre' => $params['title'],
          'date_interval' => $params['date_interval'],
          'institut' => $params['institut'],
          'description' => $params['description'],
          'type' => $params['type'],
          'user_id' =>Auth::user()->id,
        ];

        if (PortfolioEduExp::create($data)){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }
    public function EditAboutAction(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);

        $data =  [
          'titre' => $params['title'],
          'date_interval' => $params['date_interval'],
          'institut' => $params['institut'],
          'description' => $params['description'],
        ];

        if (PortfolioEduExp::where(['id_edu' => $params['id']])->update($data)){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }

    public function UpdateAboutPicture(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $check =  PortfolioAbout::where(['user_id' => Auth::user()['id']])->first();

        if ($check['bg'] != 'about_dark.jpg'){
            Picture::to()->path('uploads/portfolio/about')->delete($check['bg']);
        }
        $file =  Picture::to()->path('uploads/portfolio/about')->formats(300, 300)->upload($params['file']);
        $update = PortfolioAbout::where(['user_id' => Auth::user()['id']])->update(['bg' => $file]);
        if ( $update){
            echo "true";
            die;
        }

    }


    public function portfolioContact()
    {
        $unread =  PortfolioContact::where(['readed' => 0])->count();
        $messages = PortfolioContact::all();
        return View::render('gestion.portfolio.contact',compact("messages","unread"));
    }


    public function portfolioContactDetail(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        $message = PortfolioContact::find($id);
        $message->update(['readed' => 1]);
         if (!empty($message)){
            echo json_encode($message);
         }else{
             echo "false";
         }
        die;
    }

    public function portfolioContactDelete(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        $message = PortfolioContact::find($id);
         if ( $message->delete()){
            echo "true";
         }else{
             echo "false";
         }
        die;
    }



    public function portfolioPortfolio()
    {
        $customers = Customer::all();
        $portfolio = PortfolioPortfolio::join('customers', 'portfolio_portfolios.customer', '=', 'customers.id')
            ->get();
        return View::render('gestion.portfolio.portfolio',compact('customers','portfolio'));
    }


    public function portfolioAdd(ServerRequestInterface $request)
    {
         $params = $this->getParams($request);
        $picture = Picture::to()->path("uploads/portfolio/portfolio")->formats(300,300)->upload($params['image_portfolio']);
        $data = [
         'projet_type' => $params['type_projet_projet'],
         'customer' => $params['customer_portfolio'],
         'duration' => $params['duration_portfolio'],
         'technologies' => $params['technology_used_portfolio'],
         'budget' => $params['budget_portfolio'],
         'picture' => "localhost:8000/uploads/portfolio/portfolio/".$picture,
            'user_id' => Auth::user()->id
        ];
          if (PortfolioPortfolio::create($data)){
             echo "true";
          }else{
             echo "false";
          }
          die;
    }


    public function portfolioBlog()
    {
        $articles = PortfolioBlog::all();
        return View::render('gestion.portfolio.blog',compact("articles"));
    }

    public function AddportfolioArticle(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $file =  Picture::to()->path('uploads/portfolio/blog')->formats(300, 300)->upload($params['picture']);

        $data = [
            'title' => $params['titre'],
            'tag' => $params['tag'],
            'slug' => $params['slug'],
            'picture' => "localhost:8000/uploads/portfolio/blog/".$file,
            'content' => $params['description'],
            'author' => Auth::user()->firstname.' '.Auth::user()->lastname,
            'user_id' => Auth::user()->id,
            'status' => $params['status'],
        ];

        if (PortfolioBlog::create($data)){
            echo "true";
        }else{
            echo "false";
        }

die;

    }


    public function portfolioArticleAction(ServerRequestInterface $request){
        $id = $request->getAttribute("id");
        $type = $request->getAttribute('type');
        if ($type == 3){

            $file = PortfolioBlog::where(['id' => $id])->first();

            if (PortfolioBlog::where(['id' => $id])->delete()){
                Picture::to()->delete($file['picture']);
                echo 'true';
            }
            else{
                echo 'false';
            }
        }
        else{
            if (PortfolioBlog::where(['id' => $id])->update(['status' => $type])){
                echo 'true';
            }
            else{
                echo 'false';
            }

        }
        die;
    }


    public function portfolioHome()
    {
          $home = PortfolioHome::where(['user_id' => Auth::user()->id])->first();
        return View::render('gestion.portfolio.home',compact("home"));
    }

    public function portfolioHomeFile(ServerRequestInterface $request)
    {
         $params = $this->getParams($request);
         $attach = $params['file'];
         $check = PortfolioHome::where(['user_id' => Auth::user()->id])->first();
         $count = PortfolioHome::where(['user_id' => Auth::user()->id])->count();

      $file = Picture::to()->path("uploads/portfolio/home")->upload($attach);


         if ($count == 1){
             $data = [
                 'background'=> $file,
             ];
              Picture::to()->path('uploads/portfolio/home')->delete($check['background']);
             PortfolioHome::where(['user_id' => Auth::user()->id])->update($data);
         }
         else{
             $data = [
                 'background'=> $file,
                  'user_id' => Auth::user()->id
             ];
             PortfolioHome::create($data);
         }

     die;

    }

    public function portfolioHomeTitles(ServerRequestInterface $request)
    {
         $params = $this->getParams($request);



        $count = PortfolioHome::where(['user_id' => Auth::user()->id])->count();

        if ($count > 0){
            $data = [
                'title1' => $params['title1'],
                'title2' => $params['title2'],
                'title3' => $params['title3'],
            ];
            if (PortfolioHome::where(['user_id' => Auth::user()->id])->update($data)){
                echo "true";
            }else{
                echo "false";
            }
        }
        else{
            $data = [
                'title1' => $params['title1'],
                'title2' => $params['title2'],
                'title3' => $params['title3'],
                'user_id' => Auth::user()->id
            ];
            if (PortfolioHome::create($data)){
                echo "true";
            }else{
                echo "false";
            }
        }

        die;
    }

    public function portfolioHomeDescription(ServerRequestInterface $request)
    {
         $params = $this->getParams($request);



        $count = PortfolioHome::where(['user_id' => Auth::user()->id])->count();

        if ($count > 0){
            $data = [
                'description' => $params['description'],
            ];
            if (PortfolioHome::where(['user_id' => Auth::user()->id])->update($data)){
                echo "true";
            }else{
                echo "false";
            }
        }
        else{
            $data = [
                'description' => $params['description'],
                'user_id' => Auth::user()->id
            ];
            if (PortfolioHome::create($data)){
                echo "true";
            }else{
                echo "false";
            }
        }

        die;
    }

}