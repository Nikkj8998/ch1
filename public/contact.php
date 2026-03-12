<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }

error_reporting(E_ALL);
ini_set('display_errors', 1);

function debugLog($message) {
    file_put_contents('contact_debug.log', date('Y-m-d H:i:s') . " - " . $message . "\n", FILE_APPEND);
}

debugLog("=== Script started ===");

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if (strpos($contentType, 'application/json') !== false) {
    $raw   = file_get_contents("php://input");
    $input = json_decode($raw, true);
    debugLog("JSON input: " . $raw);
    if ($input) {
        $name         = $input['name']         ?? '';
        $email        = $input['email']        ?? '';
        $phone        = $input['phone']        ?? '';
        $company      = $input['company']      ?? '';
        $industry     = $input['industry']     ?? '';
        $requirements = $input['requirements'] ?? '';
    } else {
        $name = $email = $phone = $company = $industry = $requirements = '';
    }
} else {
    $name         = $_POST['name']         ?? '';
    $email        = $_POST['email']        ?? '';
    $phone        = $_POST['phone']        ?? '';
    $company      = $_POST['company']      ?? '';
    $industry     = $_POST['industry']     ?? '';
    $requirements = $_POST['requirements'] ?? '';
    debugLog("Form data - Name: $name, Email: $email");
}

debugLog("Extracted - Name: '$name', Email: '$email', Phone: '$phone', Company: '$company'");

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(["error" => "Name and email are required fields"]);
    exit();
}

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: CarbonHive <no-reply@carbonhive.com>\r\n";
$headers .= "Reply-To: info@carbonhive.com\r\n";

// ── Colours (matching website) ──────────────────────────────────────────────
$BG        = '#0B1120';   // page background
$CARD      = '#111827';   // card / container
$CARD2     = '#1A2235';   // table row alt
$BORDER    = '#1E3050';   // subtle border
$GOLD      = '#FFA800';   // primary amber
$GREEN     = '#163E22';   // dark green bg
$GREEN_BT  = '#22A048';   // green button / bright
$TEXT      = '#D1D9E6';   // body text
$MUTED     = '#7A8FA6';   // muted text
$WHITE     = '#FFFFFF';

// ── Industry row (only if filled) ───────────────────────────────────────────
$industryRow = '';
if (!empty($industry)) {
    $industryRow = '
        <tr>
          <td style="padding:12px 18px; font-size:13px; font-weight:700; letter-spacing:.06em;
                     text-transform:uppercase; color:' . $GOLD . '; background:' . $GREEN . ';
                     border-bottom:1px solid ' . $BORDER . '; width:32%;">Industry</td>
          <td style="padding:12px 18px; font-size:14px; color:#4ADE80; font-weight:600;
                     background:' . $GREEN . '; border-bottom:1px solid ' . $BORDER . ';">'
              . htmlspecialchars($industry) . '</td>
        </tr>';
}

// ═══════════════════════════════════════════════════════════════════════════
//  ADMIN NOTIFICATION EMAIL
// ═══════════════════════════════════════════════════════════════════════════
$adminEmail   = "info@carbonhive.com";
$adminSubject = "New Enquiry — " . htmlspecialchars($name) . " | CarbonHive";

$adminMessage = '
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0; padding:0; background:' . $BG . '; font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $BG . '; padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px; width:100%; background:' . $CARD . ';
                    border-radius:14px; overflow:hidden;
                    border:1px solid ' . $BORDER . ';
                    box-shadow:0 8px 40px rgba(0,0,0,0.55);">

        <!-- ── HEADER ── -->
        <tr>
          <td style="background:' . $BG . '; padding:28px 32px 0; border-bottom:2px solid ' . $GOLD . ';">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <span style="font-size:26px; font-weight:800; color:' . $GOLD . ';
                               letter-spacing:.12em; text-transform:uppercase;">CarbonHive</span><br>
                  <span style="font-size:11px; color:' . $MUTED . '; letter-spacing:.18em;
                               text-transform:uppercase;">Process Solution Architects</span>
                </td>
                <td align="right" valign="middle">
                  <span style="display:inline-block; padding:5px 14px; background:' . $GREEN . ';
                               border:1px solid ' . $GREEN_BT . '; border-radius:6px;
                               font-size:11px; font-weight:700; color:#4ADE80;
                               letter-spacing:.1em; text-transform:uppercase;">New Lead</span>
                </td>
              </tr>
            </table>
            <div style="height:18px;"></div>
          </td>
        </tr>

        <!-- ── TITLE ── -->
        <tr>
          <td style="padding:28px 32px 8px;">
            <p style="margin:0 0 4px; font-size:11px; color:' . $MUTED . ';
                      letter-spacing:.2em; text-transform:uppercase;">Enquiry Received</p>
            <h1 style="margin:0; font-size:22px; font-weight:800; color:' . $WHITE . ';">
              New Contact Form Submission
            </h1>
            <div style="margin-top:14px; height:2px;
                        background:linear-gradient(to right, ' . $GOLD . '55, transparent);"></div>
          </td>
        </tr>

        <!-- ── DATA TABLE ── -->
        <tr>
          <td style="padding:8px 32px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="border-radius:10px; overflow:hidden;
                          border:1px solid ' . $BORDER . ';">
              <tr>
                <td style="padding:12px 18px; font-size:13px; font-weight:700; letter-spacing:.06em;
                           text-transform:uppercase; color:' . $GOLD . '; background:' . $CARD2 . ';
                           border-bottom:1px solid ' . $BORDER . '; width:32%;">Name</td>
                <td style="padding:12px 18px; font-size:14px; color:' . $WHITE . '; font-weight:600;
                           background:' . $CARD2 . '; border-bottom:1px solid ' . $BORDER . ';">'
                    . htmlspecialchars($name) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 18px; font-size:13px; font-weight:700; letter-spacing:.06em;
                           text-transform:uppercase; color:' . $GOLD . '; background:' . $CARD . ';
                           border-bottom:1px solid ' . $BORDER . ';">Email</td>
                <td style="padding:12px 18px; font-size:14px; color:' . $TEXT . ';
                           background:' . $CARD . '; border-bottom:1px solid ' . $BORDER . ';">
                  <a href="mailto:' . htmlspecialchars($email) . '"
                     style="color:#60A5FA; text-decoration:none;">'
                    . htmlspecialchars($email) . '</a></td>
              </tr>
              <tr>
                <td style="padding:12px 18px; font-size:13px; font-weight:700; letter-spacing:.06em;
                           text-transform:uppercase; color:' . $GOLD . '; background:' . $CARD2 . ';
                           border-bottom:1px solid ' . $BORDER . ';">Phone</td>
                <td style="padding:12px 18px; font-size:14px; color:' . $TEXT . ';
                           background:' . $CARD2 . '; border-bottom:1px solid ' . $BORDER . ';">'
                    . (empty($phone) ? '<span style="color:' . $MUTED . ';">—</span>' : htmlspecialchars($phone)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 18px; font-size:13px; font-weight:700; letter-spacing:.06em;
                           text-transform:uppercase; color:' . $GOLD . '; background:' . $CARD . ';
                           border-bottom:1px solid ' . $BORDER . ';">Company</td>
                <td style="padding:12px 18px; font-size:14px; color:' . $TEXT . ';
                           background:' . $CARD . '; border-bottom:1px solid ' . $BORDER . ';">'
                    . (empty($company) ? '<span style="color:' . $MUTED . ';">—</span>' : htmlspecialchars($company)) . '</td>
              </tr>
              ' . $industryRow . '
              <tr>
                <td style="padding:14px 18px; font-size:13px; font-weight:700; letter-spacing:.06em;
                           text-transform:uppercase; color:' . $GOLD . '; background:' . $CARD2 . ';
                           vertical-align:top;">Requirements</td>
                <td style="padding:14px 18px; font-size:14px; color:' . $TEXT . ';
                           background:' . $CARD2 . '; line-height:1.7;">'
                    . (empty($requirements) ? '<span style="color:' . $MUTED . ';">—</span>' : nl2br(htmlspecialchars($requirements))) . '</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td style="background:' . $BG . '; padding:18px 32px; border-top:1px solid ' . $BORDER . ';
                     text-align:center;">
            <p style="margin:0; font-size:12px; color:' . $MUTED . ';">
              &copy; ' . date("Y") . ' CarbonHive &nbsp;&middot;&nbsp;
              <a href="https://www.carbonhive.in" style="color:' . $GOLD . '; text-decoration:none;">www.carbonhive.in</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>';


// ═══════════════════════════════════════════════════════════════════════════
//  USER CONFIRMATION EMAIL
// ═══════════════════════════════════════════════════════════════════════════
$userSubject = "We've Received Your Enquiry — CarbonHive";

$userMessage = '
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0; padding:0; background:' . $BG . '; font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $BG . '; padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px; width:100%; background:' . $CARD . ';
                    border-radius:14px; overflow:hidden;
                    border:1px solid ' . $BORDER . ';
                    box-shadow:0 8px 40px rgba(0,0,0,0.55);">

        <!-- ── HEADER ── -->
        <tr>
          <td style="background:' . $BG . '; padding:28px 32px 0; border-bottom:2px solid ' . $GOLD . ';">
            <p style="margin:0; font-size:26px; font-weight:800; color:' . $GOLD . ';
                      letter-spacing:.12em; text-transform:uppercase;">CarbonHive</p>
            <p style="margin:2px 0 18px; font-size:11px; color:' . $MUTED . ';
                      letter-spacing:.18em; text-transform:uppercase;">Process Solution Architects</p>
          </td>
        </tr>

        <!-- ── HERO MESSAGE ── -->
        <tr>
          <td style="padding:36px 32px 28px; text-align:center;">
            <!-- checkmark circle -->
            <div style="display:inline-block; width:60px; height:60px; border-radius:50%;
                        background:' . $GREEN . '; border:2px solid ' . $GREEN_BT . ';
                        line-height:60px; font-size:28px; margin-bottom:20px;">&#10003;</div>
            <h1 style="margin:0 0 8px; font-size:24px; font-weight:800; color:' . $WHITE . ';">
              Thank You, <span style="color:' . $GOLD . ';">' . htmlspecialchars($name) . '</span>!
            </h1>
            <p style="margin:0; font-size:15px; color:' . $TEXT . '; line-height:1.7; max-width:460px; margin:0 auto;">
              We have received your enquiry. Our engineering team will review your requirements
              and reach out to you shortly.
            </p>
            <div style="margin:24px auto; height:1px; max-width:400px;
                        background:linear-gradient(to right, transparent, ' . $BORDER . ', transparent);"></div>
          </td>
        </tr>

        <!-- ── NEXT STEPS ── -->
        <tr>
          <td style="padding:0 32px 32px;">
            <p style="margin:0 0 16px; font-size:11px; font-weight:700; color:' . $MUTED . ';
                      letter-spacing:.2em; text-transform:uppercase;">What Happens Next</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:12px 16px; background:' . $CARD2 . '; border-radius:10px;
                           border:1px solid ' . $BORDER . '; margin-bottom:10px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:36px; vertical-align:top; padding-top:1px;">
                        <span style="display:inline-block; width:24px; height:24px; border-radius:50%;
                                     background:' . $GREEN . '; border:1px solid ' . $GREEN_BT . ';
                                     font-size:12px; font-weight:700; color:#4ADE80;
                                     text-align:center; line-height:24px;">1</span>
                      </td>
                      <td style="font-size:14px; color:' . $TEXT . '; padding-left:10px;">
                        <strong style="color:' . $WHITE . ';">Review</strong> &mdash;
                        Our team analyses your process requirements in detail.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr><td style="height:8px;"></td></tr>
              <tr>
                <td style="padding:12px 16px; background:' . $CARD2 . '; border-radius:10px;
                           border:1px solid ' . $BORDER . ';">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:36px; vertical-align:top; padding-top:1px;">
                        <span style="display:inline-block; width:24px; height:24px; border-radius:50%;
                                     background:' . $GREEN . '; border:1px solid ' . $GREEN_BT . ';
                                     font-size:12px; font-weight:700; color:#4ADE80;
                                     text-align:center; line-height:24px;">2</span>
                      </td>
                      <td style="font-size:14px; color:' . $TEXT . '; padding-left:10px;">
                        <strong style="color:' . $WHITE . ';">Contact</strong> &mdash;
                        An engineer reaches out within <strong style="color:' . $GOLD . ';">24 business hours</strong>.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr><td style="height:8px;"></td></tr>
              <tr>
                <td style="padding:12px 16px; background:' . $CARD2 . '; border-radius:10px;
                           border:1px solid ' . $BORDER . ';">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:36px; vertical-align:top; padding-top:1px;">
                        <span style="display:inline-block; width:24px; height:24px; border-radius:50%;
                                     background:' . $GREEN . '; border:1px solid ' . $GREEN_BT . ';
                                     font-size:12px; font-weight:700; color:#4ADE80;
                                     text-align:center; line-height:24px;">3</span>
                      </td>
                      <td style="font-size:14px; color:' . $TEXT . '; padding-left:10px;">
                        <strong style="color:' . $WHITE . ';">Proposal</strong> &mdash;
                        We deliver a tailored solution designed for your process.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── CTA BUTTON ── -->
        <tr>
          <td style="padding:0 32px 36px; text-align:center;">
            <a href="https://www.carbonhive.in"
               style="display:inline-block; padding:14px 36px;
                      background:' . $GREEN . '; color:#4ADE80;
                      border:1px solid ' . $GREEN_BT . ';
                      border-radius:10px; font-size:15px; font-weight:700;
                      text-decoration:none; letter-spacing:.05em;">
              Explore Our Solutions &#8594;
            </a>
          </td>
        </tr>

        <!-- ── QUOTE ── -->
        <tr>
          <td style="padding:0 32px 28px;">
            <div style="border-left:3px solid ' . $GOLD . '; padding:12px 18px;
                        background:rgba(255,168,0,0.05); border-radius:0 8px 8px 0;">
              <p style="margin:0; font-size:13px; font-style:italic; color:' . $GOLD . '; line-height:1.7;">
                &ldquo;Engineering Precision, Powering Throughput &mdash;
                from lab trials to turnkey installations.&rdquo;
              </p>
            </div>
          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td style="background:' . $BG . '; padding:18px 32px; border-top:1px solid ' . $BORDER . ';
                     text-align:center;">
            <p style="margin:0 0 4px; font-size:12px; color:' . $MUTED . ';">
              You received this email because you contacted CarbonHive via our website.
            </p>
            <p style="margin:0; font-size:12px; color:' . $MUTED . ';">
              &copy; ' . date("Y") . ' CarbonHive &nbsp;&middot;&nbsp;
              <a href="https://www.carbonhive.in" style="color:' . $GOLD . '; text-decoration:none;">www.carbonhive.in</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>';


// ── Send emails ──────────────────────────────────────────────────────────────
$adminMailResult = @mail($adminEmail, $adminSubject, $adminMessage, $headers);
$userMailResult  = @mail($email,      $userSubject,  $userMessage,  $headers);

debugLog("Admin email sent: " . ($adminMailResult ? "Yes" : "No"));
debugLog("User email sent: "  . ($userMailResult  ? "Yes" : "No"));

if ($adminMailResult) {
    echo json_encode(["success" => true, "message" => "Your message has been sent successfully!"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email. Please try again later."]);
}

debugLog("=== Script ended ===\n");
?>
