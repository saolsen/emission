#import "ARUserIntentModule.h"
#import <React/RCTBridgeModule.h>

@implementation ARUserIntentModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendNotification:(nonnull NSString *)notificationName userInfo:(NSDictionary *)userInfo)
{
    [[NSNotificationCenter defaultCenter] postNotificationName:notificationName object:nil userInfo:userInfo];
}

// All notification JS methods occur on the main queue/thread.
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
