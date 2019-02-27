#import "ARShowComponentViewController.h"
#import "AREmission.h"
#import "ARGraphQLQueryPreloader.h"

@interface ARShowComponentViewController ()

@end

@implementation ARShowComponentViewController

+ (NSArray<ARGraphQLQuery *> *)preloadQueriesWithShowID:(NSString *)showID;
{
   NSDictionary *variables = @{
       @"showID": showID,
   };
   return @[[[ARGraphQLQuery alloc] initWithQueryName:@"QueryRenderersShowQuery" variables:variables]];
}

- (instancetype)initWithShowID:(NSString *)showID
{
    return [self initWithShowID:showID emission:[AREmission sharedInstance]];
}

- (instancetype)initWithShowID:(NSString *)showID emission:(nullable AREmission *)emission
{
    return [super initWithEmission:emission moduleName:@"Show" initialProperties:@{ @"showID": showID }];
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
