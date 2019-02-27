#import "ARFairComponentViewController.h"
#import "AREmission.h"
#import "ARGraphQLQueryPreloader.h"

@interface ARFairComponentViewController ()

@end


@implementation ARFairComponentViewController

+ (NSArray<ARGraphQLQuery *> *)preloadQueriesWithFairID:(NSString *)fairID;
{
   NSDictionary *variables = @{
       @"fairID": fairID,
   };
   return @[[[ARGraphQLQuery alloc] initWithQueryName:@"QueryRenderersFairQuery" variables:variables]];
}

- (instancetype)initWithFairID:(NSString *)fairID
{
    return [self initWithFairID:fairID emission:[AREmission sharedInstance]];
}

- (instancetype)initWithFairID:(NSString *)fairID emission:(nullable AREmission *)emission
{
    self = [super initWithEmission:emission moduleName:@"Fair" initialProperties:@{ @"fairID": fairID }];
    if (self) {
        self.fullBleed = YES;
    }
    return self;
}

// Don't support rotation in iPhone

- (UIInterfaceOrientationMask)supportedInterfaceOrientations
{
    return UI_USER_INTERFACE_IDIOM() != UIUserInterfaceIdiomPhone ? UIInterfaceOrientationMaskAll : UIInterfaceOrientationMaskAllButUpsideDown;
}

- (BOOL)shouldAutorotate
{
    return UI_USER_INTERFACE_IDIOM() != UIUserInterfaceIdiomPhone;
}

@end
