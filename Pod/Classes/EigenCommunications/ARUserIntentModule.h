#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

// Invoked on the main thread.
typedef void(^ARUserActivityBlock)(NSDictionary * _Nonnull info, NSString *type);

/// Gives host apps the chance to hook into events around the users actions and intentions
@interface ARUserIntentModule : RCTEventEmitter <RCTBridgeModule>

/// E.g. when you've loaded an show, we can send metadata which can be used to create `UIUserActivity`s
@property (nonatomic, copy, nullable, readwrite) ARUserActivityBlock userActivityOccured;
/// Gives the host app a chance to show app review notifications for example
@property (nonatomic, copy, nullable, readwrite) ARUserActivityBlock userPosiitiveInteractionOccured;

@end
