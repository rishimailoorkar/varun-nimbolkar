<?php
// PHP 8.1+ with cURL. Host outside the Vercel static site.
declare(strict_types=1);
header('Content-Type: application/json');
header('Cache-Control: no-store');
function respond(int $status, array $body): never { http_response_code($status); echo json_encode($body); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['error'=>'Method not allowed']);
$secret = getenv('CONTACT_PROXY_TOKEN') ?: '';
if (!$secret || !hash_equals('Bearer '.$secret, $_SERVER['HTTP_AUTHORIZATION'] ?? '')) respond(401, ['error'=>'Unauthorized']);
$raw = file_get_contents('php://input', false, null, 0, 12001);
if (strlen($raw) > 12000) respond(413, ['error'=>'Too large']);
$data = json_decode($raw, true);
if (!is_array($data)) respond(422, ['error'=>'Invalid enquiry']);
if (!empty($data['website'])) respond(422, ['error'=>'Invalid enquiry']);
$fields = ['name'=>100,'email'=>254,'organisation'=>160,'phone'=>40,'type'=>80,'date'=>20,'location'=>200,'budget'=>100,'message'=>5000,'consent'=>3];
foreach ($fields as $field=>$limit) { if (isset($data[$field]) && !is_string($data[$field])) respond(422,['error'=>'Invalid field']); $data[$field]=trim($data[$field]??''); if(strlen($data[$field])>$limit) respond(422,['error'=>'Field too long']); }
$types=['Live performance','Studio / sitar session','Composition / film','Collaboration','Press / interview','Other'];
if (!$data['name'] || !filter_var($data['email'], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/',$data['email']) || !in_array($data['type'],$types,true) || strlen($data['message'])<20 || $data['consent']!=='yes') respond(422,['error'=>'Check required fields']);
$key=getenv('RESEND_API_KEY'); $to=getenv('BOOKING_EMAIL'); $from=getenv('BOOKING_FROM');
if (!$key || !$to || !$from) respond(503,['error'=>'Delivery unavailable']);
// Locked global send budget protects the mailbox without storing visitor data.
$rate = fopen(sys_get_temp_dir().'/varun-contact-rate.json','c+');
if (!$rate || !flock($rate,LOCK_EX)) respond(503,['error'=>'Try later']);
$state=json_decode(stream_get_contents($rate),true) ?: ['time'=>time(),'count'=>0];
if(time()-$state['time']>3600) $state=['time'=>time(),'count'=>0];
if($state['count']>=20) { flock($rate,LOCK_UN); fclose($rate); respond(429,['error'=>'Try later']); }
$state['count']++; ftruncate($rate,0); rewind($rate); fwrite($rate,json_encode($state)); flock($rate,LOCK_UN); fclose($rate);
$text="Website booking enquiry\n\n";
foreach($fields as $field=>$limit) if($field!=='consent') $text.=ucfirst($field).": ".$data[$field]."\n\n";
$ch=curl_init('https://api.resend.com/emails');
curl_setopt_array($ch,[CURLOPT_POST=>true,CURLOPT_RETURNTRANSFER=>true,CURLOPT_TIMEOUT=>12,CURLOPT_HTTPHEADER=>['Authorization: Bearer '.$key,'Content-Type: application/json'],CURLOPT_POSTFIELDS=>json_encode(['from'=>$from,'to'=>[$to],'reply_to'=>$data['email'],'subject'=>'Booking enquiry: '.$data['type'],'text'=>$text])]);
$result=curl_exec($ch); $code=curl_getinfo($ch,CURLINFO_HTTP_CODE); curl_close($ch);
if($code<200 || $code>=300 || empty(json_decode((string)$result,true)['id'])) respond(502,['error'=>'Delivery failed']);
respond(200,['ok'=>true]);
