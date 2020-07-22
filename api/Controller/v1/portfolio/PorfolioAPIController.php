<?php


namespace Api\Controller\v1\portfolio;


use Akuren\Auth\Auth;
use Akuren\Mail\Mail;
use Api\Controller\ResfulController;
use App\Models\PortfolioBlog;
use App\Models\PortfolioContact;
use App\Models\PortfolioEduExp;
use App\Models\PortfolioHome;
use App\Models\PortfolioPortfolio;
use App\Models\PortfolioSkill;
use App\Models\User;
use App\Views\View;
use OpenApi\Annotations as OA;
use Psr\Http\Message\ServerRequestInterface;

class PorfolioAPIController extends ResfulController
{

    /**
     * @OA\Get(
     *     path="/api/v1/{clientID}/{access-token}/portfolio/index",
     *     @OA\Parameter(
    name="clientID",
     *          in="query",
     *           description="Client ID de l'utilisateur",
     *           required=true,
     *           @OA\Schema(type="integer")
     *      ),
     *          @OA\Parameter(
    name="access-token",
     *          in="query",
     *          description="Jeton d'accès",
     *           required=true,
     *           @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *            response="200",
     *            description="contenu de la partie Acceuil ou home du portfolio",
     *            @OA\JsonContent(type ="string",description="vos titres"),
     *              )
     *       )
     * @param ServerRequestInterface $request
     * @return \Psr\Http\Message\ResponseInterface
     */

    public function index(ServerRequestInterface $request)
    {
        $clientId = $request->getAttribute('clientID');
         $token =  $request->getAttribute('access-token');
         $result = $this->AuthChecker($clientId,$token);

         if ($result == []){
             $User = User::where(['clientID' => $clientId])->first();
             $home = PortfolioHome::join('portfolio_abouts', 'portfolio_homes.user_id', '=', 'portfolio_abouts.user_id')
                 ->
             where(['portfolio_homes.user_id' => $User['id']])->first();

             $education =  PortfolioEduExp::where(['user_id' => $User['id'] , 'type' =>1 ])->get();

             $experience=  PortfolioEduExp::where(['user_id' => $User['id'] , 'type' => 2])->get();

             $skill=  PortfolioSkill::where(['user_id' => $User['id']])->get();

             $work =  PortfolioPortfolio::where(['user_id' => $User['id'], 'status' => 1])->get();

             $blog =  PortfolioBlog::where(['user_id' => $User['id'], 'status' => 1])->orderBy('id', 'DESC')->get();


             $r = [
                 'status' => 000,
                 'home' => $home,
                'resume' => [
                    'education' => $education,
                    'experience' => $experience,
                    'skill' => $skill
                ],
                 'work' => $work,
                 'blog' => $blog,

             ];


             return View::Json(compact('r'));
         }
         else{
             return View::Json($result);
         }
    }

    public function detailBlog(ServerRequestInterface $request){
        $clientId = $request->getAttribute('clientID');
        $token =  $request->getAttribute('access-token');
        $result = $this->AuthChecker($clientId,$token);
        $slug =  $request->getAttribute('slug');
        if ($result == []){
            $User = User::where(['clientID' => $clientId])->first();

            $detail = PortfolioBlog::join('users', 'portfolio_blogs.user_id', '=', 'users.id')->where(['portfolio_blogs.slug' => $slug,  'portfolio_blogs.user_id' => $User['id'] ])->first();

            $r = [
                'status' => 000,
                'detail' => $detail,
            ];


            return View::Json(compact('r'));
        }
        else{
            return View::Json($result);
        }
    }

    public function addContact(ServerRequestInterface $request){
        $clientId = $request->getAttribute('clientID');
        $token =  $request->getAttribute('access-token');
        $result = $this->AuthChecker($clientId,$token);

        if ($result == []){
            $User = User::where(['clientID' => $clientId])->first();

            $params = $this->getParams($request);

            $data = [
             "fullname" => $params['fullname'],
             "email" => $params['email'],
            'sujet' => $params['sujet'],
            'message' => $params['message'],
             'user_id' => $User['id']
            ];

            if (PortfolioContact::create($data)){
                Mail::send()
                    ->setMessage('portfolio', $params)
                    ->setSubjet('Message contact portfolio')
                    ->setToMail($User['email'])
                    ->exec();
                $r = [
                    'status' => 'success',
                    'message' => 'Message sent successfully'
                ];
            }else{
                $r = [
                    'status' => 'success',
                    'message' => 'Message  not sent!'
                ];
            }

            return View::Json(compact('r'));
        }
        else{
            return View::Json($result);
        }
    }


}